import express from 'express';
import Customer from '../models/Customer.model.js';
import Order from '../models/Order.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   GET /api/customers/profile
// @desc    Get customer profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    let customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      customer = await Customer.create({
        user: req.user._id,
        email: req.user.email,
        name: req.user.name
      });
    }

    res.json({
      success: true,
      customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/customers/profile
// @desc    Update customer profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, dateOfBirth, gender, preferences } = req.body;

    let customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      customer = await Customer.create({
        user: req.user._id,
        email: req.user.email
      });
    }

    if (name) customer.name = name;
    if (phone) customer.phone = phone;
    if (dateOfBirth) customer.dateOfBirth = dateOfBirth;
    if (gender) customer.gender = gender;
    if (preferences) customer.preferences = { ...customer.preferences, ...preferences };

    await customer.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/customers/addresses
// @desc    Add shipping address
// @access  Private
router.post('/addresses', protect, async (req, res) => {
  try {
    const { name, phone, address, city, state, postalCode, country, isDefault } = req.body;

    let customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      customer = await Customer.create({
        user: req.user._id,
        email: req.user.email
      });
    }

    if (isDefault) {
      customer.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    customer.addresses.push({
      name,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || customer.addresses.length === 0
    });

    await customer.save();

    res.json({
      success: true,
      message: 'Address added successfully',
      addresses: customer.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/customers/addresses/:addressId
// @desc    Update shipping address
// @access  Private
router.put('/addresses/:addressId', protect, async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const address = customer.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    Object.assign(address, req.body);

    if (req.body.isDefault) {
      customer.addresses.forEach(addr => {
        if (addr._id.toString() !== req.params.addressId) {
          addr.isDefault = false;
        }
      });
    }

    await customer.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      addresses: customer.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/customers/addresses/:addressId
// @desc    Delete shipping address
// @access  Private
router.delete('/addresses/:addressId', protect, async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    customer.addresses.id(req.params.addressId).deleteOne();
    await customer.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      addresses: customer.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/customers/orders
// @desc    Get customer orders
// @access  Private
router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/customers/orders/:orderId
// @desc    Get order details
// @access  Private
router.get('/orders/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/customers/favorites/:productId
// @desc    Add/remove product from favorites
// @access  Private
router.put('/favorites/:productId', protect, async (req, res) => {
  try {
    let customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      customer = await Customer.create({
        user: req.user._id,
        email: req.user.email
      });
    }

    const isFavorite = customer.favoriteProducts.includes(req.params.productId);

    if (isFavorite) {
      customer.favoriteProducts = customer.favoriteProducts.filter(
        id => id.toString() !== req.params.productId
      );
    } else {
      customer.favoriteProducts.push(req.params.productId);
    }

    await customer.save();

    res.json({
      success: true,
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      isFavorite: !isFavorite,
      favorites: customer.favoriteProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
