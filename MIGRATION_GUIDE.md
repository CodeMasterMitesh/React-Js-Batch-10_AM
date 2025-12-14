# Developer Migration Guide

## What Changed in Your Project

This document explains all the changes made to convert your static site into a fully dynamic e-commerce platform.

---

## 📊 Migration Summary

| Layer | Changes | Impact |
|-------|---------|--------|
| **Database** | 4 new models | More comprehensive data storage |
| **Backend Routes** | 3 new route files | New cart, checkout, customer APIs |
| **Frontend Context** | 1 new context | Global cart state management |
| **Frontend Pages** | 5 new pages | Complete shopping workflow |
| **Authentication** | Enhanced | Now supports customer login + cart |
| **Middleware** | Updated | Added `adminOnly` export |

---

## 🔄 Before vs After

### BEFORE
```
Static HTML Pages
  ├── Home
  ├── Shop (list only, no details)
  ├── About
  ├── Blog
  ├── Contact
  ├── Account (empty placeholder)
  └── Company

No Shopping Features
  ├── ❌ No cart functionality
  ├── ❌ No checkout
  ├── ❌ No customer accounts
  ├── ❌ No orders
  └── ❌ No login/register
```

### AFTER
```
Dynamic e-Commerce Platform
  ├── Customer Features
  │   ├── ✅ Product browsing with details
  │   ├── ✅ Shopping cart (guest + user)
  │   ├── ✅ Checkout system
  │   ├── ✅ Order history
  │   ├── ✅ Customer accounts
  │   ├── ✅ Login/Register
  │   └── ✅ Wishlist
  │
  └── Admin Features
      ├── ✅ Admin login
      ├── ✅ Dashboard
      ├── ✅ Order management
      ├── ✅ Product management (ready)
      ├── ✅ Category management (ready)
      ├── ✅ Blog management (ready)
      └── ✅ Settings management (ready)
```

---

## 🗄️ Database Changes

### New Collections

#### 1. Carts Collection
```javascript
// Stores shopping carts for both guests and logged-in users
{
  _id: ObjectId,
  user: ObjectId | null,           // Null for guests
  guestSessionId: String | null,   // GUID for guests
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

**Purpose**: Track shopping carts across sessions

#### 2. Payments Collection
```javascript
// Tracks all payment transactions
{
  _id: ObjectId,
  orderId: ObjectId,
  userId: ObjectId,
  amount: Number,
  paymentMethod: String,           // COD, Card, UPI
  status: String,                  // pending, completed, failed, refunded
  transactionId: String,
  paymentId: String,
  responseMessage: String,
  createdAt: Date
}
```

**Purpose**: Maintain payment transaction history

#### 3. Customers Collection
```javascript
// Enhanced customer profiles
{
  _id: ObjectId,
  user: ObjectId,
  email: String,
  name: String,
  phone: String,
  addresses: [{...}],              // Multiple addresses
  favoriteProducts: [ObjectId],    // Wishlist
  totalOrders: Number,
  totalSpent: Number,
  loyaltyPoints: Number,
  createdAt: Date
}
```

**Purpose**: Store customer details and loyalty information

#### 4. ActivityLogs Collection
```javascript
// Tracks user activities with auto-expiration
{
  _id: ObjectId,
  action: String,                  // checkout, payment, etc
  userId: ObjectId | null,         // Null for guests
  guestSessionId: String | null,
  status: String,
  details: Object,
  createdAt: Date,                 // Expires after 90 days (TTL)
}
```

**Purpose**: Activity tracking and analytics

### Modified Collections

#### Orders Collection (Enhanced)
```javascript
// BEFORE: Basic order structure
{
  _id: ObjectId,
  items: [ObjectId],    // Just product IDs
  totalAmount: Number,
  orderStatus: String
}

// AFTER: Full-featured orders
{
  _id: ObjectId,
  user: ObjectId,
  items: [{                         // Now includes quantity & price
    product: ObjectId,
    quantity: Number,
    price: Number,
    total: Number
  }],
  shippingAddress: {                // Full address details
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    email: String
  },
  subtotal: Number,
  tax: Number,                      // Auto-calculated
  shippingCost: Number,             // Auto-calculated
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,            // pending, paid, failed, refunded
  paymentId: String,
  transactionId: String,
  orderStatus: String,              // pending, confirmed, processing, shipped, delivered, cancelled
  notes: String,
  createdAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
}
```

---

## 🔌 API Changes

### New Routes Added

#### Cart API (`/api/cart`)
```javascript
// BEFORE: No cart API

// AFTER: Full cart management
GET    /api/cart                    // Get cart
POST   /api/cart/add                // Add item
POST   /api/cart/remove/:id         // Remove item
POST   /api/cart/update/:id         // Update quantity
POST   /api/cart/clear              // Clear cart
```

#### Checkout API (`/api/checkout`)
```javascript
// NEW: Complete checkout flow
POST   /api/checkout                // Create order from cart
POST   /api/checkout/payment-success // Confirm payment
POST   /api/checkout/payment-failed  // Handle failure
```

#### Customer API (`/api/customers`)
```javascript
// NEW: Customer profile management
GET    /api/customers/profile       // Get profile
PUT    /api/customers/profile       // Update profile
POST   /api/customers/addresses     // Add address
PUT    /api/customers/addresses/:id // Update address
DELETE /api/customers/addresses/:id // Delete address
GET    /api/customers/orders        // Get orders
GET    /api/customers/orders/:id    // Get order detail
PUT    /api/customers/favorites/:id // Toggle favorite
```

### Modified Routes

#### Order API (Enhanced)
```javascript
// BEFORE
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id/status       // Only admin

// AFTER
GET    /api/orders                  // Better filtering
GET    /api/orders/:id              // Better auth checks
PUT    /api/orders/:id/status       // Better validation
PUT    /api/orders/:id/cancel       // NEW: User can cancel
```

---

## 🎨 Frontend Architecture

### New Context - CartContext

**File**: `src/context/CartContext.jsx`

**Purpose**: Global shopping cart state management

```javascript
// Usage
const { 
  cart,              // Current cart state
  addToCart,         // Add product to cart
  removeFromCart,    // Remove product
  updateQuantity,    // Change quantity
  clearCart,         // Clear entire cart
  loading,           // Loading state
  error              // Error messages
} = useCart();
```

**Features**:
- ✅ Guest cart support (via guestSessionId)
- ✅ User cart support (via userId)
- ✅ Auto-sync with backend API
- ✅ Error handling
- ✅ Loading states

### Wrapped with CartProvider

**File**: `src/App.jsx`

```jsx
// NOW WRAPPED WITH CART PROVIDER
<AuthProvider>
  <CartProvider>        {/* NEW */}
    <ContextProvider>
      <ModalProvider>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </ModalProvider>
    </ContextProvider>
  </CartProvider>
</AuthProvider>
```

---

## 📄 New Frontend Pages

### 1. Product Detail Page
**File**: `src/pages/ProductDetail.jsx`

**Route**: `/product/:productId`

**Features**:
- ✅ Product image gallery with thumbnails
- ✅ Price with discount display
- ✅ Stock availability
- ✅ Quantity selector
- ✅ Add to cart button
- ✅ Product specifications
- ✅ Rating display

**Replaces**: Static shop page product card

### 2. Shopping Cart Page
**File**: `src/pages/Cart.jsx`

**Route**: `/cart`

**Features**:
- ✅ Cart items table
- ✅ Quantity editor
- ✅ Remove items
- ✅ Order summary
- ✅ Tax/shipping calculator
- ✅ Proceed to checkout
- ✅ Continue shopping

**Replaces**: No previous page

### 3. Checkout Page
**File**: `src/pages/Checkout.jsx`

**Route**: `/checkout` (protected)

**Features**:
- ✅ Shipping address form
- ✅ Payment method selector
- ✅ Order summary
- ✅ Total calculation
- ✅ Place order button

**Replaces**: No previous page

### 4. Registration Page
**File**: `src/pages/Register.jsx`

**Route**: `/register`

**Features**:
- ✅ User registration form
- ✅ Email validation
- ✅ Password confirmation
- ✅ Link to login

**Replaces**: Account page registration section

### 5. Login Page
**File**: `src/pages/Login.jsx`

**Route**: `/login`

**Features**:
- ✅ Customer login form
- ✅ Error handling
- ✅ Demo credentials
- ✅ Link to registration

**Replaces**: Account page login section

---

## 🔐 Authentication Changes

### BEFORE
```javascript
// Only admin login
/admin/login
```

### AFTER
```javascript
// Dual authentication system
/admin/login    // Admin authentication
/login          // Customer authentication
/register       // Customer registration

// Cart integrates with auth
// Guest cart auto-converts to user cart on login
```

---

## 🛣️ Route Structure Changes

### BEFORE
```
/ (AppLayout)
├── / (Home)
├── /shop (Shop - list only)
├── /about (About)
├── /blog (Blog)
├── /contact (Contact)
├── /account (Account - placeholder)
├── /company (Company)
└── /admin/login (Admin)
    └── /admin/dashboard (Admin)
```

### AFTER
```
/ (AppLayout)
├── / (Home)
├── /shop (Shop - list)
├── /product/:id (NEW - Product detail)
├── /cart (NEW - Shopping cart)
├── /checkout (NEW - Checkout, protected)
├── /about (About)
├── /blog (Blog)
├── /contact (Contact)
├── /account (Account - now dynamic)
├── /company (Company)
├── /register (NEW - Register)
├── /login (NEW - Login)
├── /admin/login (Admin login)
└── /admin/dashboard (Admin)
    ├── /admin/products
    ├── /admin/categories
    ├── /admin/blogs
    ├── /admin/orders
    └── /admin/settings
```

---

## 🔧 Middleware Updates

### BEFORE
```javascript
export const protect = (middleware for JWT)
export const authorize = (role-based middleware)
```

### AFTER
```javascript
export const protect = (JWT verification)
export const adminOnly = (NEW - admin check)      // ← NEW
export const authorize = (role-based check)
```

**Usage**:
```javascript
// Admin-only route
router.put('/:id/status', protect, adminOnly, updateOrderStatus)
```

---

## 📦 Dependencies Added

### Backend
```json
{
  "uuid": "^9.0.0"  // For guest session IDs
}
```

### Frontend
```json
{
  // Already had axios, just ensuring it's installed
  "axios": "^1.x"
}
```

---

## 💾 Data Migration

### If Upgrading Existing Database

1. **No Migration Needed** - New collections are created automatically
2. **Cart Collection** - Created on first guest/user cart action
3. **Payments Collection** - Created on first order
4. **Customers Collection** - Created on first checkout
5. **ActivityLogs Collection** - Created on first activity

### Pre-Population

Run `npm run seed` in server directory to populate:
- Sample admin user
- Sample products
- Sample categories
- Sample blog posts

---

## 🧪 Testing Checklist

### Backend APIs
- [ ] Cart endpoints working (add, remove, update)
- [ ] Checkout flow working (cart → order)
- [ ] Customer endpoints working (profile, addresses, orders)
- [ ] Auth working (login, register)
- [ ] Protected routes enforcing security
- [ ] Admin routes requiring admin access

### Frontend Features
- [ ] Cart context loading correctly
- [ ] Cart persists on refresh (guest)
- [ ] Product detail page showing correctly
- [ ] Checkout form submitting
- [ ] Login/Register working
- [ ] Protected routes redirecting properly

### User Flows
- [ ] Guest → Add to cart → Login → Checkout works
- [ ] Registered user → Login → Browse → Cart → Checkout
- [ ] Admin → Admin login → Dashboard access

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection tested
- [ ] JWT secret set
- [ ] CORS configured properly
- [ ] All routes tested
- [ ] Error handling working
- [ ] SSL certificate ready (if needed)
- [ ] Database backups configured
- [ ] Payment gateway keys ready (when integrating)

---

## 📚 Related Documents

- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **QUICK_START.md** - API testing guide
- **PROJECT_STRUCTURE.md** - File structure
- **README_FEATURES.md** - Complete features list

---

## ⚠️ Breaking Changes

If you had any custom modifications:

1. **AuthContext Path Changed**
   ```javascript
   // OLD: import { useAuth } from '../contexts/AuthContext'
   // NEW: import { useAuth } from '../context/AuthContext'
   ```

2. **Order Model Schema Updated**
   - Old orders still work but lack new fields
   - Recommend updating order schema gradually

3. **Protected Route Component Updated**
   - Now uses `user` instead of `isAuthenticated`
   - Works with new auth structure

---

## 🆘 Rollback Instructions

If you need to revert:

```bash
# Backup current database
mongodump --uri "mongodb://localhost:27017/shophub"

# Revert code changes
git reset --hard <previous-commit>

# Reinstall dependencies
cd server && npm install
npm install
```

---

## 📞 Common Issues

### Issue: "Cart not working after login"
**Solution**: Check CartContext is wrapped in App.jsx

### Issue: "Checkout not creating orders"
**Solution**: Verify MongoDB connection and Order model

### Issue: "404 on new routes"
**Solution**: Ensure server.js has all route imports registered

### Issue: "CORS errors"
**Solution**: Check CLIENT_URL in .env matches frontend URL

---

**Migration Status**: ✅ Complete
**Backward Compatibility**: ⚠️ Mostly Compatible
**Rollback Possible**: ✅ Yes
**Testing Required**: ✅ All flows

---

Last Updated: December 2024
Version: 1.0.0 → 2.0.0 (Full Stack Ready)
