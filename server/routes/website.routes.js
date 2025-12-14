import express from 'express';
import WebsiteSettings from '../models/Website.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   GET /api/website/settings
// @desc    Get website settings
// @access  Public
router.get('/settings', async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    
    if (!settings) {
      // Create default settings if not exist
      settings = await WebsiteSettings.create({
        siteName: 'ShopHub',
        siteDescription: 'Your trusted e-commerce destination',
        topBanner: {
          text: '✨ Free Shipping on Orders Over $50 | 30-Day Returns | Shop Now!',
          isActive: true
        }
      });
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/website/settings
// @desc    Update website settings
// @access  Private/Admin
router.put('/settings', protect, authorize('admin'), async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    
    if (!settings) {
      settings = await WebsiteSettings.create(req.body);
    } else {
      settings = await WebsiteSettings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
