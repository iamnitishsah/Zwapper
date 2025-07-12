import express from 'express';
import { body, validationResult } from 'express-validator';
import SwapRequest from '../models/SwapRequest.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/requests
// @desc    Create a new swap request
// @access  Private
router.post('/', protect, [
  body('recipientId')
    .isMongoId()
    .withMessage('Valid recipient ID is required'),
  body('skillRequested')
    .trim()
    .notEmpty()
    .withMessage('Skill requested is required'),
  body('skillOffered')
    .trim()
    .notEmpty()
    .withMessage('Skill offered is required'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { recipientId, skillRequested, skillOffered, message } = req.body;

    // Check if recipient exists and is public
    const recipient = await User.findOne({ 
      _id: recipientId, 
      isPublic: true 
    });

    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found or profile is private'
      });
    }

    // Check if sender is trying to request from themselves
    if (recipientId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send request to yourself'
      });
    }

    // Check if skill requested is offered by recipient
    if (!recipient.skillsOffered.includes(skillRequested.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Recipient does not offer this skill'
      });
    }

    // Check if skill offered is in sender's skills
    if (!req.user.skillsOffered.includes(skillOffered.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'You do not offer this skill'
      });
    }

    // Check if there's already a pending request
    const existingRequest = await SwapRequest.findOne({
      sender: req.user._id,
      recipient: recipientId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending request with this user'
      });
    }

    // Create new request
    const swapRequest = new SwapRequest({
      sender: req.user._id,
      recipient: recipientId,
      skillRequested: skillRequested.toLowerCase(),
      skillOffered: skillOffered.toLowerCase(),
      message
    });

    await swapRequest.save();

    // Populate sender and recipient details
    await swapRequest.populate([
      { path: 'sender', select: 'fullName username avatar' },
      { path: 'recipient', select: 'fullName username avatar' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Swap request sent successfully',
      data: swapRequest
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/requests
// @desc    Get user's requests (sent and received)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { type = 'all', status, page = 1, limit = 10 } = req.query;

    let query = {};
    
    // Filter by type (sent, received, or all)
    if (type === 'sent') {
      query.sender = req.user._id;
    } else if (type === 'received') {
      query.recipient = req.user._id;
    } else {
      // Get both sent and received
      query.$or = [
        { sender: req.user._id },
        { recipient: req.user._id }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const requests = await SwapRequest.find(query)
      .populate('sender', 'fullName username avatar')
      .populate('recipient', 'fullName username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SwapRequest.countDocuments(query);

    res.json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/requests/:id/status
// @desc    Update request status (accept/reject/cancel)
// @access  Private
router.put('/:id/status', protect, [
  body('status')
    .isIn(['accepted', 'rejected', 'cancelled'])
    .withMessage('Status must be accepted, rejected, or cancelled')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const request = await SwapRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user is authorized to update this request
    const isSender = request.sender.toString() === req.user._id.toString();
    const isRecipient = request.recipient.toString() === req.user._id.toString();

    if (!isSender && !isRecipient) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this request'
      });
    }

    // Validate status transitions
    if (status === 'cancelled' && !isSender) {
      return res.status(403).json({
        success: false,
        message: 'Only the sender can cancel a request'
      });
    }

    if (status === 'accepted' && !isRecipient) {
      return res.status(403).json({
        success: false,
        message: 'Only the recipient can accept a request'
      });
    }

    if (status === 'rejected' && !isRecipient) {
      return res.status(403).json({
        success: false,
        message: 'Only the recipient can reject a request'
      });
    }

    // Update request
    request.status = status;
    await request.save();

    // Populate user details
    await request.populate([
      { path: 'sender', select: 'fullName username avatar' },
      { path: 'recipient', select: 'fullName username avatar' }
    ]);

    res.json({
      success: true,
      message: `Request ${status} successfully`,
      data: request
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/requests/:id
// @desc    Get specific request details
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const request = await SwapRequest.findById(id)
      .populate('sender', 'fullName username avatar')
      .populate('recipient', 'fullName username avatar');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user is authorized to view this request
    const isSender = request.sender._id.toString() === req.user._id.toString();
    const isRecipient = request.recipient._id.toString() === req.user._id.toString();

    if (!isSender && !isRecipient) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this request'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Get request details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router; 