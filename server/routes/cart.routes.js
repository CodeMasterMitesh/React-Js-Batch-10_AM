import express from 'express';
import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
import { protect } from '../middleware/auth.middleware.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get cart ID from user or session
const getCartIdentifier = (req) => {
  if (req.user) {
    return { user: req.user._id, guestSessionId: null };
  }
  let sessionId = req.cookies.guestSessionId;
  if (!sessionId) {
    sessionId = uuidv4();
  }
  return { user: null, guestSessionId: sessionId };
};

// @route   GET /api/cart
// @desc    Get current cart
// @access  Public
router.get('/', async (req, res) => {
  try {
    const identifier = getCartIdentifier(req);
    
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: identifier.user }).populate('items.product');
    } else {
      cart = await Cart.findOne({ guestSessionId: identifier.guestSessionId }).populate('items.product');
    }

    if (!cart) {
      return res.json({
        success: true,
        cart: { items: [], totalItems: 0, totalPrice: 0 }
      });
    }

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Public
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const identifier = getCartIdentifier(req);
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: identifier.user });
    } else {
      cart = await Cart.findOne({ guestSessionId: identifier.guestSessionId });
    }

    if (!cart) {
      cart = await Cart.create({
        ...identifier,
        items: [{
          product: productId,
          quantity,
          price: product.price
        }]
      });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price
        });
      }
      
      await cart.save();
    }

    const updatedCart = await Cart.findById(cart._id).populate('items.product');

    res.json({
      success: true,
      message: 'Item added to cart',
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Public
router.post('/remove/:productId', async (req, res) => {
  try {
    const identifier = getCartIdentifier(req);
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: identifier.user });
    } else {
      cart = await Cart.findOne({ guestSessionId: identifier.guestSessionId });
    }

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/cart/update/:productId
// @desc    Update cart item quantity
// @access  Public
router.post('/update/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const identifier = getCartIdentifier(req);
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: identifier.user });
    } else {
      cart = await Cart.findOne({ guestSessionId: identifier.guestSessionId });
    }

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');

    res.json({
      success: true,
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/cart/clear
// @desc    Clear entire cart
// @access  Public
router.post('/clear', async (req, res) => {
  try {
    const identifier = getCartIdentifier(req);
    
    if (req.user) {
      await Cart.deleteOne({ user: identifier.user });
    } else {
      await Cart.deleteOne({ guestSessionId: identifier.guestSessionId });
    }

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
