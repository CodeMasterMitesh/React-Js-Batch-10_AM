# ShopHub - Dynamic E-commerce Application

Complete full-stack e-commerce application with React frontend and Node.js backend.

## 🎯 Features

### Frontend
- Dynamic product catalog
- Blog system
- Shopping cart & checkout
- User authentication
- **Admin Panel** with full management capabilities

### Backend
- RESTful API with Express
- MongoDB database
- JWT authentication
- CRUD operations for all entities
- Protected admin routes

## 📦 Project Structure

```
React-Js-Batch-10_AM/
├── server/                 # Backend API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── utils/             # Helpers
│   ├── server.js          # Main server
│   ├── seed.js            # Database seeder
│   └── package.json
│
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   │   └── admin/         # Admin panel pages
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── App.jsx
│
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup

```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your settings
notepad .env

# Start MongoDB (if local)
net start MongoDB

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```powershell
# Navigate back to root
cd ..

# Install frontend dependencies (if not already done)
npm install

# Install axios for API calls
npm install axios

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: `admin@shophub.com`
- Password: `Admin@123`

**Admin Routes:**
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`
- Products: `http://localhost:5173/admin/products`
- Categories: `http://localhost:5173/admin/categories`
- Blogs: `http://localhost:5173/admin/blogs`
- Orders: `http://localhost:5173/admin/orders`
- Settings: `http://localhost:5173/admin/settings`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@shophub.com",
  "password": "Admin@123"
}
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Logout**
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### Products Endpoints

**Get All Products**
```http
GET /api/products?category=&featured=true&limit=20&page=1
```

**Get Single Product**
```http
GET /api/products/:id
```

**Create Product** (Admin Only)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 149.99,
  "category": "categoryId",
  "stock": 100,
  "images": [{"url": "image-url"}],
  "isFeatured": true
}
```

**Update Product** (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer {token}
```

**Delete Product** (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

### Categories Endpoints

```http
GET    /api/categories           # Get all
GET    /api/categories/:id       # Get one
POST   /api/categories           # Create (Admin)
PUT    /api/categories/:id       # Update (Admin)
DELETE /api/categories/:id       # Delete (Admin)
```

### Blogs Endpoints

```http
GET    /api/blogs                # Get all
GET    /api/blogs/:id            # Get one
POST   /api/blogs                # Create (Admin)
PUT    /api/blogs/:id            # Update (Admin)
DELETE /api/blogs/:id            # Delete (Admin)
```

### Website Settings

```http
GET  /api/website/settings       # Get settings
PUT  /api/website/settings       # Update (Admin)
```

### Orders

```http
GET    /api/orders               # Get orders
GET    /api/orders/:id           # Get one
POST   /api/orders               # Create order
PUT    /api/orders/:id/status    # Update status (Admin)
```

## 🛠️ Environment Variables

### Backend (.env in server/)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@shophub.com
ADMIN_PASSWORD=Admin@123
CLIENT_URL=http://localhost:5173
```

### Frontend
Update API base URL in `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 🎨 Admin Panel Features

### Dashboard
- Overview statistics
- Quick access links
- System information

### Product Management
- Create, Read, Update, Delete products
- Image upload support
- Category assignment
- Stock management
- Featured/Sale/Deal flags

### Category Management
- Create and manage product categories
- Upload category images
- Active/Inactive status

### Blog Management
- Create and publish blog posts
- Rich content editor
- Category assignment
- Featured posts

### Order Management
- View all orders
- Update order status
- Track shipping

### Website Settings
- Site information
- Contact details
- Social media links
- Banner management

## 🔧 Development

### Testing API with Postman/Thunder Client

1. **Login to get token:**
   - POST to `http://localhost:5000/api/auth/login`
   - Copy the returned `token`

2. **Use token in requests:**
   - Add header: `Authorization: Bearer YOUR_TOKEN`

3. **Test endpoints:**
   - Try creating a product
   - Update a category
   - Create a blog post

### Frontend Development

The admin panel uses:
- React Router for navigation
- Context API for auth state
- Axios for API calls
- CSS Modules for styling

To add new admin pages:
1. Create component in `src/pages/admin/`
2. Add route in `src/App.jsx`
3. Update sidebar navigation in `AdminDashboard.jsx`

## 📱 Testing Flow

1. **Start both servers:**
   ```powershell
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd ..
   npm run dev
   ```

2. **Seed database:**
   ```powershell
   cd server
   npm run seed
   ```

3. **Test admin login:**
   - Go to `http://localhost:5173/admin/login`
   - Login with: `admin@shophub.com` / `Admin@123`
   - You should see the dashboard

4. **Test API:**
   - Dashboard should show stats
   - Products, categories, blogs counts should display

## 🚨 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify PORT 5000 is available
- Check .env file exists and is configured

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in server/server.js
- Verify API_URL in src/services/api.js

### Admin login fails
- Run seed script: `npm run seed` in server/
- Check MongoDB connection
- Verify credentials match .env

### Database errors
- Ensure MongoDB is running: `net start MongoDB`
- Or use MongoDB Atlas cloud database
- Update MONGODB_URI in .env

## 📈 Next Steps

To extend the application:

1. **Complete CRUD pages** for Products, Categories, Blogs
2. **Add image upload** with Cloudinary
3. **Implement orders** processing
4. **Add payment** integration (Stripe/PayPal)
5. **Create customer** dashboard
6. **Add email** notifications
7. **Implement search** and filters
8. **Add analytics** and reports

## 📝 Notes

- **Security:** Change default admin password in production
- **CORS:** Update CLIENT_URL in .env for production
- **Database:** Consider MongoDB Atlas for cloud hosting
- **Images:** Implement Cloudinary or S3 for image storage
- **Deployment:** Use PM2 for backend, Vercel/Netlify for frontend

## 🤝 Support

For issues or questions:
1. Check server logs in terminal
2. Check browser console for frontend errors
3. Verify both servers are running
4. Ensure MongoDB is connected

## 📄 License

MIT License - Feel free to use for learning and projects!
