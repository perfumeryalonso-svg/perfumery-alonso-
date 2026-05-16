#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Premium Luxury Perfume Catalog - Installation Guide${NC}\n"

# Check Node.js
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js ${$(node -v)}${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm ${$(npm -v)}${NC}"

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL is not found in PATH. Ensure MySQL is installed and running.${NC}"
fi

echo -e "\n${YELLOW}Step 1: Installing Frontend Dependencies${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Step 2: Installing Backend Dependencies${NC}"
cd backend
npm install
cd ..
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Step 3: Setting up Environment Variables${NC}"

# Frontend env
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
    echo "   Edit .env.local and update VITE_API_URL if needed"
else
    echo "   .env.local already exists"
fi

# Backend env
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ Created backend/.env${NC}"
    echo "   Edit backend/.env with your database credentials:"
    echo "   - DB_HOST (default: localhost)"
    echo "   - DB_USER (default: root)"
    echo "   - DB_PASSWORD (your MySQL password)"
    echo "   - JWT_SECRET (strong random string)"
else
    echo "   backend/.env already exists"
fi

echo -e "\n${YELLOW}Step 4: Database Setup${NC}"
echo "To complete database setup, run:"
echo -e "${GREEN}mysql -u root -p < backend/database.sql${NC}"
echo "Or manually create the database in MySQL and import the schema."

echo -e "\n${YELLOW}Step 5: Starting the Application${NC}"
echo "In two separate terminals, run:"
echo -e "${GREEN}Terminal 1 (Frontend):${NC} npm run dev"
echo -e "${GREEN}Terminal 2 (Backend):${NC} cd backend && npm run dev"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"

echo -e "\n${YELLOW}Step 6: Create Admin Account${NC}"
echo "After backend is running, create an admin account:"
echo -e "${GREEN}curl -X POST http://localhost:5000/api/auth/register \\\\"
echo "  -H \"Content-Type: application/json\" \\\\"
echo "  -d '{\"email\": \"admin@example.com\", \"password\": \"SecurePassword123!\"}'${NC}"

echo -e "\n${YELLOW}Step 7: Login to Admin Panel${NC}"
echo "Visit: http://localhost:5173/admin/login"
echo "Use the credentials from Step 6"

echo -e "\n${GREEN}✨ Installation complete! Follow the steps above to get started.${NC}\n"
echo "📚 For detailed instructions, see SETUP.md"
echo "📖 For project info, see PROJECT_README.md"
