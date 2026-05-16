# Premium Luxury Perfume Catalog

A sophisticated full-stack web application showcasing premium luxury perfume collections with admin management capabilities.

## 🎯 Features

### Public Website
- ✨ Hero section with elegant animations
- 🛍️ Premium perfume catalog with pagination
- 📱 Fully responsive mobile design
- 🔍 Product details and specifications
- 💬 WhatsApp ordering integration
- 🎨 Luxury minimalist design

### Admin Panel
- 🔐 Secure JWT authentication
- ➕ Add, edit, and delete perfumes
- 📷 Image URL management
- 📊 Product inventory management
- 🔒 Protected admin routes

## 🏗️ Architecture

```
Perfumes/
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API integration
│   │   ├── context/       # State management
│   │   └── styles/        # Global styles
│   └── package.json
│
├── backend/               # Node.js + Express
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Auth & error handling
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Helper functions
│   ├── database.sql       # MySQL schema
│   └── package.json
│
└── README.md
```

## 📋 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Modern animations

### Backend
- Node.js
- Express
- MySQL
- JWT Authentication
- bcryptjs for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MySQL 8+
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create database:**
   ```bash
   mysql -u root -p < database.sql
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 🎨 Design System

### Color Palette
- **Background**: #0B0B0B (Luxury Dark)
- **Cards**: #151515 (Luxury Card)
- **Accent**: #C8A96B (Gold)
- **Text**: #F5F5F5 (Luxury Text)
- **Muted**: #888888 (Luxury Muted)

### Key Features
- Large, elegant typography
- Premium spacing and gaps
- Minimalist, clean layout
- Soft shadows and smooth transitions
- Rounded corners with luxury border accents
- Modern animations and hover effects

## 📝 Database Schema

### Admins Table
- id: Primary Key
- email: Unique admin email
- password: Hashed password
- created_at: Timestamp

### Perfumes Table
- id: Primary Key
- nombre: Product name
- descripcion: Product description
- precio: Price (decimal)
- ml: Volume in milliliters
- categoria: Category/Type
- imagen_url: Product image URL
- created_at: Creation timestamp
- updated_at: Last update timestamp

## 🔐 Authentication

- JWT-based authentication
- bcryptjs password hashing (10 salt rounds)
- Token stored in localStorage
- Auto-logout on 401 response
- Protected admin routes

## 🌐 API Endpoints

### Perfumes
- `GET /api/perfumes` - Get all perfumes (paginated)
- `GET /api/perfumes/:id` - Get specific perfume
- `GET /api/perfumes/category/:categoria` - Get by category
- `POST /api/perfumes` - Create perfume (admin)
- `PUT /api/perfumes/:id` - Update perfume (admin)
- `DELETE /api/perfumes/:id` - Delete perfume (admin)

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login

## 💬 WhatsApp Integration

When users click the WhatsApp button:
```
Message: "Hello, I am interested in the perfume {name} {ml}ml"
```

This opens WhatsApp with a prefilled message, making it easy for customers to inquire about products.

## 🎬 Creating Initial Admin Account

1. Use the backend `/api/auth/register` endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "securepassword"}'
```

2. Then login through `/admin/login` on the frontend

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
Ensure environment variables are properly set in production, then:
```bash
cd backend
npm start
```

## 🔒 Security Considerations

- All passwords are hashed with bcryptjs
- JWT tokens expire after 7 days (configurable)
- Protected admin endpoints require valid token
- CORS configured for frontend origin
- Environment variables for sensitive data

## 📱 Responsive Design

The application is fully responsive:
- Desktop: 3 columns grid
- Tablet: 2 columns grid
- Mobile: 1 column grid

## 🚧 Future Enhancements

- [ ] User wishlist functionality
- [ ] Advanced search and filtering
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Product variations (sizes, packaging)

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 👤 Support

For support and inquiries, contact: support@luxeperfums.com

---

Built with ❤️ for premium perfume enthusiasts
