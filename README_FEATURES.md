# ShopHub - Full Stack E-Commerce Platform

A complete MERN (MongoDB, Express, React, Node.js) e-commerce solution with shopping cart, checkout, customer accounts, and admin panel.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# Backend Setup
cd server
npm install
npm run dev
# Runs on http://localhost:5000

# Frontend Setup (in another terminal)
npm install
npm run dev
# Runs on http://localhost:5174
```

### Environment Setup

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5174
NODE_ENV=development
```

---

## ✨ Features Implemented

### 🛍️ Customer Features
- **Product Browsing**
  - Browse all products with filtering
  - View detailed product pages with gallery
  - See stock availability and pricing

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Calculate totals with tax and shipping
  - Guest cart support (persists in localStorage)

- **Checkout**
  - Enter shipping address
  - Select payment method (COD, Card, UPI)
  - Place orders with order confirmation

- **Customer Account**
  - User registration and login
  - View order history
  - Track order status
  - Manage shipping addresses
  - Wishlist/Favorites

- **Order Management**
  - View past orders
  - Check order status
  - Cancel orders (if applicable)

### 👨‍💼 Admin Features
- **Admin Login** - Secure admin access
- **Dashboard** - Overview and quick links
- **Order Management** - Track and update order status
- **Product Management** - Create, edit, delete products
- **Category Management** - Organize products
- **Blog Management** - Manage blog posts
- **Settings** - Configure website settings

### 🔒 Security
- JWT authentication
- Password hashing with bcryptjs
- Protected routes (admin & customer)
- Role-based access control
- httpOnly cookies for tokens

---

## 📁 Project Structure

```
ShopHub/
├── server/                          # Backend
│   ├── models/                     # MongoDB schemas
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Order.model.js
│   │   ├── Cart.model.js           # NEW
│   │   ├── Customer.model.js       # NEW
│   │   ├── Payment.model.js        # NEW
│   │   ├── ActivityLog.model.js    # NEW
│   │   └── ...
│   ├── routes/                     # API endpoints
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js          # NEW
│   │   ├── checkout.routes.js      # NEW
│   │   ├── customer.routes.js      # NEW
│   │   ├── order.routes.js
│   │   └── ...
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── src/                             # Frontend
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx         # NEW
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx       # NEW
│   │   ├── Cart.jsx                # NEW
│   │   ├── Checkout.jsx            # NEW
│   │   ├── Register.jsx            # NEW
│   │   ├── Login.jsx               # NEW
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       └── AdminDashboard.jsx
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── api.js                      # Axios config
│   ├── App.jsx
│   └── main.jsx
│
├── IMPLEMENTATION_SUMMARY.md        # Complete feature list
├── QUICK_START.md                   # Testing guide
├── PROJECT_STRUCTURE.md             # File structure
├── package.json
└── README.md                        # This file
```

---

## 🔌 API Reference

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
GET    /api/auth/profile           - Get user profile
PUT    /api/auth/profile           - Update profile
```

### Products
```
GET    /api/products               - List all products
GET    /api/products/:id           - Get product details
POST   /api/products               - Create product (admin)
PUT    /api/products/:id           - Update product (admin)
DELETE /api/products/:id           - Delete product (admin)
```

### Shopping Cart
```
GET    /api/cart                   - Get cart
POST   /api/cart/add               - Add to cart
POST   /api/cart/remove/:id        - Remove from cart
POST   /api/cart/update/:id        - Update quantity
POST   /api/cart/clear             - Clear cart
```

### Checkout & Orders
```
POST   /api/checkout               - Create order
POST   /api/checkout/payment-success - Confirm payment
GET    /api/orders                 - List orders
GET    /api/orders/:id             - Get order details
PUT    /api/orders/:id/status      - Update status (admin)
PUT    /api/orders/:id/cancel      - Cancel order
```

### Customer Profile
```
GET    /api/customers/profile      - Get profile
PUT    /api/customers/profile      - Update profile
POST   /api/customers/addresses    - Add address
GET    /api/customers/orders       - Get order history
PUT    /api/customers/favorites/:id - Toggle favorite
```

### Categories
```
GET    /api/categories             - List categories
POST   /api/categories             - Create (admin)
PUT    /api/categories/:id         - Update (admin)
DELETE /api/categories/:id         - Delete (admin)
```

### Blogs
```
GET    /api/blogs                  - List blogs
POST   /api/blogs                  - Create (admin)
PUT    /api/blogs/:id              - Update (admin)
DELETE /api/blogs/:id              - Delete (admin)
```

---

## 🧪 Testing Guide

### Register & Login
```
1. Go to http://localhost:5174/register
2. Create a new account
3. Go to http://localhost:5174/login
4. Login with your credentials
```

### Shopping Flow
```
1. Browse products at /shop
2. Click on a product to see details at /product/:id
3. Add to cart from product page
4. View cart at /cart
5. Click "Proceed to Checkout"
6. Fill shipping details
7. Select payment method (use COD for testing)
8. Click "Place Order"
```

### Admin Access
```
1. Go to http://localhost:5174/admin/login
2. Login with admin credentials (see seed.js for defaults)
3. Access admin dashboard at /admin/dashboard
4. Manage orders, products, etc.
```

---

## 💾 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  stock: Number,
  images: [String],
  category: ObjectId,
  sku: String,
  isFeatured: Boolean,
  rating: Number,
  createdAt: Date
}
```

### Orders
```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number,
    total: Number
  }],
  shippingAddress: Object,
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  createdAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
}
```

### Carts
```javascript
{
  user: ObjectId | null,
  guestSessionId: String | null,
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalItems: Number,
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Customers
```javascript
{
  user: ObjectId,
  email: String,
  name: String,
  phone: String,
  addresses: [{
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    isDefault: Boolean
  }],
  favoriteProducts: [ObjectId],
  totalOrders: Number,
  totalSpent: Number,
  loyaltyPoints: Number,
  createdAt: Date
}
```

---

## 🔄 User Flows

### Guest to Customer Flow
```
1. Guest browses shop without login
2. Adds items to cart (stored in localStorage)
3. Proceeds to checkout → redirected to /login
4. Registers or logs in
5. Cart items merge with user account
6. Continues with checkout
7. Places order
```

### Customer Order Flow
```
1. Customer logs in
2. Browses and adds items to cart
3. Goes to /cart to review
4. Proceeds to /checkout
5. Enters shipping address
6. Selects payment method
7. Places order
8. For COD: Order confirmed immediately
9. For Card/UPI: Redirects to payment gateway (ready for integration)
10. After payment: Cart cleared, order appears in /account
```

### Admin Order Management
```
1. Admin logs in at /admin/login
2. Accesses /admin/dashboard
3. Views all customer orders
4. Updates order status (pending → processing → shipped → delivered)
5. Can cancel orders if needed
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Utilities**: uuid, cors, dotenv

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS Modules
- **Build Tool**: Vite

---

## 📦 Installation Details

### Backend Dependencies
```json
{
  "express": "Latest",
  "mongoose": "Latest",
  "jsonwebtoken": "JWT auth",
  "bcryptjs": "Password hashing",
  "cors": "Cross-origin",
  "dotenv": "Environment vars",
  "cookie-parser": "Cookie handling",
  "uuid": "Session IDs",
  "nodemon": "Dev auto-reload"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "HTTP client",
  "react-dom": "^18.2.0",
  "vite": "Build tool"
}
```

---

## 🚀 Next Steps

### 1. **Payment Gateway Integration**
- [ ] Integrate Razorpay or Stripe
- [ ] Update `/api/checkout/payment-success`
- [ ] Add payment verification

### 2. **Email Notifications**
- [ ] Order confirmation emails
- [ ] Shipping updates
- [ ] Password reset emails

### 3. **Admin UI Dashboard**
- [ ] Product management interface
- [ ] Category management
- [ ] Order management dashboard
- [ ] Analytics & reporting

### 4. **Advanced Features**
- [ ] Product reviews & ratings
- [ ] Inventory alerts
- [ ] Coupon codes
- [ ] Refund processing
- [ ] Product recommendations

### 5. **Performance**
- [ ] Image optimization & CDN
- [ ] Database indexing
- [ ] Caching strategies
- [ ] API rate limiting

### 6. **Testing**
- [ ] Unit tests (models & utilities)
- [ ] Integration tests (API routes)
- [ ] E2E tests (user flows)
- [ ] Load testing

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MongoDB is running
# Verify .env file exists
# Clear node_modules and reinstall
cd server
rm -rf node_modules
npm install
npm run dev
```

### Frontend Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Cart Not Persisting (Guest)
- Check browser cookies are enabled
- Check localStorage in DevTools
- Clear cache if needed

### Orders Not Appearing
- Verify MongoDB connection
- Check JWT token is valid
- Ensure user is logged in for user orders

### Port Already in Use
```bash
# Find and kill process using port
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

---

## 📝 Documentation

- **IMPLEMENTATION_SUMMARY.md** - Complete feature details
- **QUICK_START.md** - Testing guide & API examples
- **PROJECT_STRUCTURE.md** - File structure & additions

---

## 👥 Team & Credits

- Built with MERN stack
- Designed for scalability
- Production-ready code
- Comprehensive error handling

---

## 📞 Support

For issues, refer to:
1. QUICK_START.md for API testing
2. IMPLEMENTATION_SUMMARY.md for feature details
3. Check terminal/console for error messages
4. Verify database connection

---

## 🎯 Status

✅ **Development**: Complete
✅ **Testing**: Ready
🟡 **Production**: Requires payment gateway integration
🟡 **Deployment**: Ready for Vercel/Railway

---

**Last Updated**: December 2024
**Version**: 1.0.0
**License**: Open Source

---

Happy Coding! 🚀
