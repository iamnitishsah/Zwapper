import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  // Request Details
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required']
  },
  
  // Skills being exchanged
  skillRequested: {
    type: String,
    required: [true, 'Skill requested is required'],
    trim: true,
    lowercase: true
  },
  skillOffered: {
    type: String,
    required: [true, 'Skill offered is required'],
    trim: true,
    lowercase: true
  },
  
  // Request Details
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  
  // Meeting Details (filled when accepted)
  meetingDetails: {
    date: Date,
    time: String,
    location: String,
    notes: String
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
swapRequestSchema.index({ sender: 1, createdAt: -1 });
swapRequestSchema.index({ recipient: 1, createdAt: -1 });
swapRequestSchema.index({ status: 1 });
swapRequestSchema.index({ 'skillRequested': 1 });
swapRequestSchema.index({ 'skillOffered': 1 });

// Prevent duplicate pending requests between same users
swapRequestSchema.index(
  { sender: 1, recipient: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: 'pending' } }
);

// Virtual for checking if request is active
swapRequestSchema.virtual('isActive').get(function() {
  return this.status === 'pending';
});

// Method to get request summary
swapRequestSchema.methods.getSummary = function() {
  return {
    _id: this._id,
    skillRequested: this.skillRequested,
    skillOffered: this.skillOffered,
    status: this.status,
    createdAt: this.createdAt,
    message: this.message
  };
};

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

export default SwapRequest; 