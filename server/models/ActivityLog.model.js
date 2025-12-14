import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['user_login', 'user_register', 'product_view', 'add_to_cart', 'remove_from_cart', 'checkout', 'order_placed', 'payment_success', 'payment_failed', 'order_cancelled', 'login_failed', 'registration_failed', 'other']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  guestSessionId: String,
  ipAddress: String,
  userAgent: String,
  details: mongoose.Schema.Types.Mixed,
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  },
  errorMessage: String
}, {
  timestamps: true
});

// Auto-delete logs older than 90 days
logSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

export default mongoose.model('ActivityLog', logSchema);
