import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all public users (for discovery)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      search,
      skill,
      availability,
      page = 1,
      limit = 10,
      sort = 'createdAt'
    } = req.query;

    // Build query
    const query = { isPublic: true };
    
    // Search by username or skill
    if (search) {
      if (search.startsWith('@')) {
        // Search by exact username
        query.username = search.substring(1).toLowerCase();
      } else {
        // Search by skill or name
        query.$or = [
          { 'skillsOffered': { $regex: search, $options: 'i' } },
          { 'skillsWanted': { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } }
        ];
      }
    }

    // Filter by specific skill
    if (skill) {
      query.$or = [
        { 'skillsOffered': { $regex: skill, $options: 'i' } },
        { 'skillsWanted': { $regex: skill, $options: 'i' } }
      ];
    }

    // Filter by availability
    if (availability) {
      const [day, timeSlot] = availability.split('-');
      if (day) query['availability.days'] = day.toLowerCase();
      if (timeSlot) query['availability.timeSlots'] = timeSlot.toLowerCase();
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users
    const users = await User.find(query)
      .select('fullName username avatar location skillsOffered skillsWanted availability createdAt')
      .sort(sort === 'nearest' && req.user?.location?.coordinates 
        ? { 'location.coordinates': { $near: req.user.location.coordinates } }
        : { [sort]: -1 }
      )
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:username
// @desc    Get user profile by username
// @access  Public
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ 
      username: username.toLowerCase(),
      isPublic: true 
    }).select('fullName username avatar location skillsOffered skillsWanted availability createdAt');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('location.address')
    .optional()
    .trim(),
  body('location.coordinates.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('location.coordinates.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  body('skillsOffered')
    .optional()
    .isArray()
    .withMessage('Skills offered must be an array'),
  body('skillsWanted')
    .optional()
    .isArray()
    .withMessage('Skills wanted must be an array'),
  body('availability.days')
    .optional()
    .isArray()
    .withMessage('Availability days must be an array'),
  body('availability.timeSlots')
    .optional()
    .isArray()
    .withMessage('Availability time slots must be an array'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean')
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

    const updateData = { ...req.body };
    
    // Clean up skills arrays (remove duplicates, trim, lowercase)
    if (updateData.skillsOffered) {
      updateData.skillsOffered = [...new Set(
        updateData.skillsOffered
          .filter(skill => skill.trim())
          .map(skill => skill.trim().toLowerCase())
      )];
    }
    
    if (updateData.skillsWanted) {
      updateData.skillsWanted = [...new Set(
        updateData.skillsWanted
          .filter(skill => skill.trim())
          .map(skill => skill.trim().toLowerCase())
      )];
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/profile/me
// @desc    Get current user's full profile
// @access  Private
router.get('/profile/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router; 