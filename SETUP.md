# 🚀 Setup Guide - Premium Luxury Perfume Catalog

## Project Structure

```
Perfumes/
├── frontend/           # [Folders created for organization]
├── backend/            # Node.js + Express API
│   ├── src/
│   ├── database.sql
│   ├── package.json
│   └── .env.example
├── public/             # Static assets
├── src/                # React frontend (ROOT LEVEL)
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── index.html          # Frontend entry
├── package.json        # Frontend + dev:backend script
├── vite.config.js      # Frontend build config
└── tailwind.config.js  # Design system config
```

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **MySQL**: v8 or higher
- **Git**: for version control

## Step 1: Backend Setup

### 1.1 Database Setup

Open MySQL and run:
```bash
mysql -u root -p < backend/database.sql
```

Or manually:
```sql
CREATE DATABASE perfume_catalog;
USE perfume_catalog;

-- Admins table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Perfumes table
CREATE TABLE perfumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  ml INT NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  imagen_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_categoria (categoria),
  INDEX idx_created_at (created_at)
);
```

### 1.2 Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express - Web server
- mysql2 - MySQL driver
- dotenv - Environment variables
- cors - Cross-origin requests
- bcryptjs - Password hashing
- jsonwebtoken - JWT auth
- axios - HTTP requests

### 1.3 Environment Configuration

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=perfume_catalog
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 1.4 Start Backend

```bash
cd backend
npm run dev
```

✅ Backend running on `http://localhost:5000`

## Step 2: Frontend Setup

### 2.1 Frontend Dependencies

```bash
npm install
```

This installs:
- react & react-dom
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - Styling
- vite - Build tool

### 2.2 Environment Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2.3 Start Frontend

In a new terminal:
```bash
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## Step 3: Create Admin Account

### Option A: Using curl

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

### Option B: Using Postman

1. POST to `http://localhost:5000/api/auth/register`
2. Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}
```

## Step 4: Login to Admin Panel

1. Open `http://localhost:5173/admin/login`
2. Enter credentials created above
3. Click "Sign In"
4. You'll be redirected to the dashboard

## Step 5: Add Perfumes

### From Dashboard:

1. Click "+ Add Perfume"
2. Fill in the form:
   - **Name**: e.g., "Dior Sauvage"
   - **Description**: Product description
   - **Price**: e.g., 129.99
   - **ML**: e.g., 100
   - **Category**: e.g., "Eau de Parfum"
   - **Image URL**: Full URL to product image
3. Click "Create"

### Sample Perfumes to Add:

```
1. Dior Sauvage
   - Price: $129.99
   - ML: 100
   - Category: Eau de Parfum
   - Image: https://via.placeholder.com/400x500?text=Dior+Sauvage

2. Tom Ford Black Orchid
   - Price: $159.99
   - ML: 100
   - Category: Eau de Parfum
   - Image: https://via.placeholder.com/400x500?text=Tom+Ford

3. Chanel No. 5
   - Price: $179.99
   - ML: 100
   - Category: Eau de Parfum
   - Image: https://via.placeholder.com/400x500?text=Chanel+No5
```

## 🧪 Testing the Application

### Test Public Pages:
1. Visit `http://localhost:5173`
2. Browse perfumes
3. Click "View Details" on a perfume
4. Click WhatsApp button (opens WhatsApp with prefilled message)

### Test Admin Features:
1. Login at `/admin/login`
2. Add new perfume
3. Edit existing perfume
4. Delete a perfume
5. Logout

## 📝 Project Architecture

### Frontend Structure
```
src/
├── components/
│   ├── common/
│   │   ├── BaseComponents.jsx     # Button, Card, Input, etc.
│   │   ├── Navigation.jsx         # Navbar, Footer
│   │   └── PerfumeCard.jsx        # Product card
│   └── ProtectedRoute.jsx         # Admin route protection
├── pages/
│   ├── HomePage.jsx               # Hero + Catalog
│   ├── ProductDetailsPage.jsx     # Single product
│   ├── AdminLoginPage.jsx         # Admin login
│   └── AdminDashboardPage.jsx     # Admin CRUD
├── services/
│   ├── api.js                     # Axios instance
│   └── perfumeService.js          # API calls
├── context/
│   ├── AuthContext.jsx            # Auth state
│   └── PerfumeContext.jsx         # Perfume state
├── App.jsx                        # Router setup
└── main.jsx                       # Entry point
```

### Backend Structure
```
backend/src/
├── index.js                       # Server entry
├── config/
│   ├── database.js               # MySQL connection
│   └── constants.js              # Constants
├── routes/
│   ├── perfumeRoutes.js         # /api/perfumes
│   └── authRoutes.js            # /api/auth
├── controllers/
│   ├── perfumeController.js     # Perfume logic
│   └── authController.js        # Auth logic
├── models/
│   └── index.js                 # DB models
├── middleware/
│   └── auth.js                  # Auth middleware
└── utils/
    ├── passwordUtils.js         # Password hashing
    └── jwtUtils.js              # JWT handling
```

## 🔐 Security Features

✅ JWT authentication (7-day tokens)
✅ Password hashing with bcryptjs (10 salt rounds)
✅ Protected admin routes
✅ CORS configured
✅ Environment variables for secrets
✅ Request validation
✅ Error handling middleware

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'luxury-dark': '#0B0B0B',
  'luxury-card': '#151515',
  'luxury-gold': '#C8A96B',
  'luxury-text': '#F5F5F5',
  'luxury-muted': '#888888'
}
```

### Add New Categories
Just add them when creating perfumes - no code changes needed!

### Customize Homepage
Edit `src/pages/HomePage.jsx` to modify hero section and catalog layout.

## 🚀 Production Deployment

### Frontend (Vercel/Netlify):
```bash
npm run build
```
Deploy the `dist/` folder

### Backend (Railway/Render):
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables:
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
   - JWT_SECRET (strong random string)
   - FRONTEND_URL
   - NODE_ENV=production
4. Deploy

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
- Verify MySQL is running
- Check DB credentials in `.env`
- Ensure database `perfume_catalog` exists

### "API connection refused"
- Backend must be running on port 5000
- Check `VITE_API_URL` in `.env.local`

### "Styles not applying"
- Run `npm install` to ensure Tailwind is installed
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

### "Login not working"
- Verify admin account exists in database
- Check JWT_SECRET in backend `.env`
- Ensure frontend token is saved in localStorage

## 📞 Support

For issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MySQL is running and database exists
4. Check backend is running on port 5000
5. Check frontend is running on port 5173

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io)

---

Happy coding! 🎉
