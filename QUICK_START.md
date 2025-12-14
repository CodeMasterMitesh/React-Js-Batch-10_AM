# Quick Start Guide - E-Commerce Features

## What's New ✨

Your React e-commerce site now has a complete shopping system with:
- ✅ Shopping cart (guest & logged-in)
- ✅ Product details page
- ✅ Checkout system
- ✅ Customer registration & login
- ✅ Order management
- ✅ Admin order tracking

---

## Step-by-Step Testing

### 1. **Register a New Account**
```
URL: http://localhost:5174/register
1. Click "Register" link
2. Enter name, email, password
3. Confirm password
4. Click "Register"
✅ Should redirect to login page
```

### 2. **Login**
```
URL: http://localhost:5174/login
1. Enter email and password from registration
2. Click "Login"
✅ Should redirect to account page
```

### 3. **Browse Products**
```
URL: http://localhost:5174/shop
1. Browse product list (should display all products)
2. Click on any product
✅ Should navigate to product detail page
```

### 4. **View Product Details**
```
URL: http://localhost:5174/product/:id
1. View product images (if multiple)
2. Click thumbnails to change image
3. Check price, stock, rating
4. Select quantity
5. Click "Add to Cart"
✅ Should show "Added to cart!" message
```

### 5. **Shop Cart**
```
URL: http://localhost:5174/cart
1. View items added
2. Adjust quantities
3. Remove items if needed
4. Check totals (includes tax & shipping)
5. Click "Proceed to Checkout"
✅ Should navigate to checkout (logged-in users)
```

### 6. **Checkout**
```
URL: http://localhost:5174/checkout
1. Fill shipping address
   - Full Name
   - Email
   - Phone
   - Address
   - City/State/Postal Code
2. Select payment method (COD for testing)
3. Click "Place Order"
✅ Should show order confirmation
```

### 7. **Guest Shopping (Without Login)**
```
1. Don't log in, browse shop
2. Add products to cart
3. Go to cart (/cart)
4. Try to checkout → redirects to login
5. Register or login
6. Cart items merge with user cart
7. Continue checkout
✅ Guest cart converts to user cart
```

---

## API Endpoints Reference

### Cart APIs (No Auth Needed)
```
GET    /api/cart                    - Get current cart
POST   /api/cart/add                - Add item (needs productId, quantity)
POST   /api/cart/remove/:productId  - Remove item
POST   /api/cart/update/:productId  - Update quantity
POST   /api/cart/clear              - Clear entire cart
```

### Checkout APIs (Login Required)
```
POST   /api/checkout                - Create order from cart
POST   /api/checkout/payment-success - Confirm payment
POST   /api/checkout/payment-failed - Handle failure
```

### Customer APIs (Login Required)
```
GET    /api/customers/profile            - Get profile
PUT    /api/customers/profile            - Update profile
POST   /api/customers/addresses          - Add address
GET    /api/customers/orders             - Get all orders
GET    /api/customers/orders/:orderId    - Get order details
PUT    /api/customers/favorites/:productId - Toggle favorites
```

### Products APIs (No Auth Needed)
```
GET    /api/products              - List all products
GET    /api/products/:id          - Get product details
```

---

## Testing with Postman / Thunder Client

### Example: Add to Cart (POST)
```
URL: http://localhost:5000/api/cart/add
Method: POST
Body (JSON):
{
  "productId": "YOUR_PRODUCT_ID",
  "quantity": 1
}
```

### Example: Create Order (POST)
```
URL: http://localhost:5000/api/checkout
Method: POST
Headers: Cookie: token=YOUR_JWT_TOKEN
Body (JSON):
{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "India"
  },
  "paymentMethod": "COD"
}
```

---

## Database Collections

Your MongoDB now has:
- `users` - Customer & admin accounts
- `products` - All products
- `categories` - Product categories
- `carts` - Shopping carts (guest & user)
- `orders` - Customer orders
- `payments` - Payment transactions
- `customers` - Customer profiles & loyalty
- `blogs` - Blog posts
- `activitylogs` - User activity tracking

---

## Key Features Implemented

### Frontend
- [x] Cart context with add/remove/update
- [x] Product detail page with gallery
- [x] Shopping cart page
- [x] Checkout form
- [x] Registration page
- [x] Login page
- [x] Protected routes

### Backend
- [x] Cart endpoints (guest + user)
- [x] Checkout flow (cart → order)
- [x] Order management
- [x] Customer management
- [x] Authentication system
- [x] Admin order tracking

---

## Common Issues & Solutions

### Issue: "Cart is empty"
**Solution**: Add products from product detail page or shop page

### Issue: "Please login to proceed"
**Solution**: Not logged in. Go to /login or /register

### Issue: "Product not found"
**Solution**: Product ID is invalid. Check product exists in database

### Issue: Cart items disappear
**Solution**: 
- For guests: Check browser has cookies enabled
- For users: Should persist in database

### Issue: "Order failed"
**Solution**: Check all shipping fields are filled correctly

---

## Next Integration Steps

### 1. **Payment Gateway**
When ready, add:
- Razorpay or Stripe integration
- Update checkout API response
- Add payment verification

### 2. **Email Notifications**
Add:
- Order confirmation emails
- Shipping updates
- Reset password emails

### 3. **Admin Dashboard**
Build:
- Product CRUD pages
- Order management dashboard
- Sales analytics
- Customer management

---

## Troubleshooting

### Backend won't start
```bash
cd server
npm install
npm run dev
```

### Frontend won't load
```bash
npm install
npm run dev
```

### Port already in use
```
Frontend: Change in vite.config.js
Backend: Change PORT in .env or server.js
```

### MongoDB connection error
```
Check:
1. MongoDB is running
2. MONGODB_URI in .env is correct
3. Database name in URI
```

---

**Status**: ✅ Ready for Production Testing
**Last Updated**: $(date)
**Environment**: Development (localhost:5000 & localhost:5174)
