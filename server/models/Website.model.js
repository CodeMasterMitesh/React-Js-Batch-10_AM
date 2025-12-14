import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'ShopHub'
  },
  siteDescription: {
    type: String,
    default: 'Your trusted e-commerce destination'
  },
  logo: {
    url: String,
    public_id: String
  },
  favicon: {
    url: String,
    public_id: String
  },
  contactInfo: {
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  banner: {
    heroTitle: String,
    heroSubtitle: String,
    heroImage: {
      url: String,
      public_id: String
    }
  },
  topBanner: {
    text: String,
    isActive: Boolean
  },
  about: {
    mission: String,
    vision: String,
    story: String
  }
}, {
  timestamps: true
});

export default mongoose.model('WebsiteSettings', websiteSettingsSchema);
