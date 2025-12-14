# ShopHub Backend API

Complete backend API for ShopHub e-commerce platform with admin panel.

## 🚀 Features

- **Authentication**: JWT-based auth with httpOnly cookies
- **Admin Panel**: Full CRUD operations for products, categories, blogs
- **Product Management**: Categories, featured products, deals
- **Blog System**: Dynamic blog posts with categories
- **Order Management**: Track customer orders
- **Website Settings**: Dynamic site configuration

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Install Dependencies

```powershell
cd server
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```powershell
copy .env.example .env
```

Update `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your_super_secret_jwt_key_change_this
ADMIN_EMAIL=admin@shophub.com
ADMIN_PASSWORD=Admin@123
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

If using local MongoDB:

```powershell
# Start MongoDB service
net start MongoDB
```

Or use MongoDB Atlas (cloud) - update MONGODB_URI in `.env`

### 4. Seed Database

```powershell
npm run seed
```

This creates:
- Admin user (admin@shophub.com / Admin@123)
- Sample categories
- Sample products
- Sample blog posts
- Website settings

### 5. Start Server

Development mode:
```powershell
npm run dev
```

Production mode:
```powershell
npm start
```

Server runs on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:id` - Update blog (Admin)
- `DELETE /api/blogs/:id` - Delete blog (Admin)

### Website Settings
- `GET /api/website/settings` - Get settings
- `PUT /api/website/settings` - Update settings (Admin)

### Orders
- `GET /api/orders` - Get orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update status (Admin)

## 🔐 Admin Login

**Default Credentials:**
- Email: `admin@shophub.com`
- Password: `Admin@123`

**Change these immediately in production!**

## 🧪 Testing API

Use Postman or Thunder Client:

1. Login to get token:
```json
POST http://localhost:5000/api/auth/login
{
  "email": "admin@shophub.com",
  "password": "Admin@123"
}
```

2. Use token in headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📁 Project Structure

```
server/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Auth & validation
├── utils/            # Helper functions
├── server.js         # Main server file
├── seed.js           # Database seeder
└── .env             # Environment variables
```

## 🔄 Integration with Frontend

Update frontend API base URL to `http://localhost:5000/api`

Configure CORS in `.env`:
```env
CLIENT_URL=http://localhost:5173
```

## 🚨 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`

**Port Already in Use:**
- Change PORT in `.env`

**CORS Issues:**
- Update CLIENT_URL in `.env`

## 📝 License

MIT
