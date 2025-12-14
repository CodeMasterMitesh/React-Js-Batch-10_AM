import express from 'express';
import Order from '../models/Order.model.js';
import Payment from '../models/Payment.model.js';
import Cart from '../models/Cart.model.js';
import Customer from '../models/Customer.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create order from cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method are required'
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Check product stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${item.product.name} is not available in required quantity`
        });
      }
    }

    // Calculate order totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over 500
    const totalAmount = subtotal + tax + shippingCost;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      shippingAddress: {
        ...shippingAddress,
        email: req.user.email
      },
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      paymentMethod,
      notes
    });

    // Create payment record
    const payment = await Payment.create({
      orderId: order._id,
      userId: req.user._id,
      amount: totalAmount,
      paymentMethod,
      status: paymentMethod === 'COD' ? 'pending' : 'pending'
    });

    // Log activity
    await ActivityLog.create({
      action: 'checkout',
      userId: req.user._id,
      status: 'success',
      details: { orderId: order._id, amount: totalAmount }
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/checkout/payment-success
// @desc    Confirm payment and clear cart
// @access  Private
router.post('/payment-success', protect, async (req, res) => {
  try {
    const { orderId, paymentId, transactionId } = req.body;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.transactionId = transactionId;
    await order.save();

    // Update payment
    await Payment.findOneAndUpdate(
      { orderId },
      { status: 'completed', transactionId, paymentId },
      { new: true }
    );

    // Reduce product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    await Cart.deleteOne({ user: req.user._id });

    // Update customer stats
    await Customer.findOneAndUpdate(
      { user: req.user._id },
      {
        $inc: {
          totalOrders: 1,
          totalSpent: order.totalAmount,
          loyaltyPoints: Math.floor(order.totalAmount / 10)
        }
      },
      { upsert: true }
    );

    // Log activity
    await ActivityLog.create({
      action: 'payment_success',
      userId: req.user._id,
      status: 'success',
      details: { orderId, amount: order.totalAmount }
    });

    res.json({
      success: true,
      message: 'Payment confirmed, order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/checkout/payment-failed
// @desc    Handle payment failure
// @access  Private
router.post('/payment-failed', protect, async (req, res) => {
  try {
    const { orderId, reason } = req.body;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.paymentStatus = 'failed';
    await order.save();

    await Payment.findOneAndUpdate(
      { orderId },
      { status: 'failed', responseMessage: reason }
    );

    await ActivityLog.create({
      action: 'payment_failed',
      userId: req.user._id,
      status: 'failed',
      details: { orderId, reason }
    });

    res.json({
      success: true,
      message: 'Payment marked as failed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
