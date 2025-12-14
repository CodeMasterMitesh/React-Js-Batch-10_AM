import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';
import Category from './models/Category.model.js';
import Product from './models/Product.model.js';
import Blog from './models/Blog.model.js';
import WebsiteSettings from './models/Website.model.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await WebsiteSettings.deleteMany({});
    console.log('🗑️  Database cleared');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@shophub.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });
    console.log('👤 Admin user created');

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Fashion', description: 'Clothing and accessories', icon: '👗' },
      { name: 'Electronics', description: 'Tech gadgets and devices', icon: '📱' },
      { name: 'Home & Living', description: 'Home decor and furniture', icon: '🏠' },
      { name: 'Beauty', description: 'Cosmetics and skincare', icon: '💄' },
      { name: 'Sports', description: 'Sports equipment and gear', icon: '⚽' }
    ]);
    console.log('📁 Categories created');

    // Create Sample Products
    const products = await Product.insertMany([
      {
        name: 'Classic White T-Shirt',
        description: 'Premium cotton t-shirt with perfect fit',
        price: 29.99,
        originalPrice: 49.99,
        category: categories[0]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600' }],
        stock: 100,
        isFeatured: true,
        isBestSeller: true,
        rating: 4.5,
        reviewsCount: 120
      },
      {
        name: 'Wireless Headphones',
        description: 'High-quality noise-canceling headphones',
        price: 199.99,
        originalPrice: 299.99,
        category: categories[1]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' }],
        stock: 50,
        isFeatured: true,
        isOnSale: true,
        rating: 4.8,
        reviewsCount: 250
      },
      {
        name: 'Modern Table Lamp',
        description: 'Elegant lamp for your workspace',
        price: 79.99,
        category: categories[2]._id,
        images: [{ url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600' }],
        stock: 30,
        isDealOfDay: true,
        rating: 4.3,
        reviewsCount: 85
      }
    ]);
    console.log('🛍️  Products created');

    // Create Sample Blogs
    await Blog.insertMany([
      {
        title: 'Top 10 Fashion Trends for 2025',
        slug: 'top-10-fashion-trends-2025',
        excerpt: 'Discover the hottest fashion trends that will dominate this year...',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full blog content here...',
        image: { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600' },
        category: 'Fashion',
        author: { name: 'Emily Davis' },
        isPublished: true,
        isFeatured: true
      },
      {
        title: 'Smart Shopping Tips',
        slug: 'smart-shopping-tips',
        excerpt: 'Learn how to save money while shopping online...',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full blog content here...',
        image: { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' },
        category: 'Shopping Tips',
        author: { name: 'Michael Chen' },
        isPublished: true
      }
    ]);
    console.log('📝 Blogs created');

    // Create Website Settings
    await WebsiteSettings.create({
      siteName: 'ShopHub',
      siteDescription: 'Your trusted e-commerce destination for quality products',
      contactInfo: {
        email: 'support@shophub.com',
        phone: '+1 (555) 123-4567',
        address: '123 Commerce Street',
        city: 'Ahmedabad',
        state: 'Gujarat',
        zipCode: '380001'
      },
      topBanner: {
        text: '✨ Free Shipping on Orders Over $50 | 30-Day Returns | Shop Now!',
        isActive: true
      }
    });
    console.log('⚙️  Website settings created');

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n📧 Admin Email: ${admin.email}`);
    console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
