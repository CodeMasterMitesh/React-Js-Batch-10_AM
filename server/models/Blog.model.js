import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    url: String,
    public_id: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Fashion', 'Technology', 'Lifestyle', 'Shopping Tips', 'Trends', 'Other']
  },
  author: {
    name: {
      type: String,
      required: true
    },
    avatar: String
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
