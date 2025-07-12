import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  // Feedback Details
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },
  reviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewed user is required']
  },
  
  // Associated swap request
  swapRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest',
    required: [true, 'Swap request is required']
  },
  
  // Rating and Review
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  
  // Skill-specific feedback
  skillTaught: {
    type: String,
    required: [true, 'Skill taught is required'],
    trim: true,
    lowercase: true
  },
  
  // Feedback categories
  categories: [{
    type: String,
    enum: ['communication', 'punctuality', 'knowledge', 'patience', 'flexibility']
  }],
  
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
feedbackSchema.index({ reviewer: 1, createdAt: -1 });
feedbackSchema.index({ reviewed: 1, createdAt: -1 });
feedbackSchema.index({ swapRequest: 1 });
feedbackSchema.index({ rating: 1 });

// Prevent duplicate feedback for same swap request
feedbackSchema.index(
  { swapRequest: 1, reviewer: 1 },
  { unique: true }
);

// Method to get public feedback (without sensitive data)
feedbackSchema.methods.getPublicFeedback = function() {
  return {
    _id: this._id,
    rating: this.rating,
    comment: this.comment,
    skillTaught: this.skillTaught,
    categories: this.categories,
    createdAt: this.createdAt
  };
};

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback; 