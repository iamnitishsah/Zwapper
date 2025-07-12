# Zwapper - Quick Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Set Up Environment Variables
```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zwapper
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB
Make sure MongoDB is running on your system. If you don't have it installed:
- **macOS**: `brew install mongodb-community`
- **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
- **Linux**: `sudo apt install mongodb`

### 4. Start Development Servers
```bash
npm run dev
```

This will start both:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:5173`

### 5. Open the Application
Navigate to `http://localhost:5173` in your browser.

## 🎯 First Steps

1. **Register a new account** with your details
2. **Complete your profile** by adding skills and availability
3. **Browse other users** on the Home page
4. **Send swap requests** to users with skills you want to learn
5. **Manage requests** in the Requests section

## 🔧 Development Commands

```bash
# Start both servers
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Build frontend for production
npm run build

# Start production backend
npm start
```

## 📁 Project Structure

```
Zwipper/
├── backend/          # Express.js API server
├── frontend/         # React.js frontend application
├── package.json      # Root package.json for scripts
├── README.md         # Detailed documentation
└── SETUP.md          # This quick setup guide
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check your connection string in `.env`
- Try connecting with MongoDB Compass

### Frontend Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`
- Check for React version conflicts

### Backend Issues
- Check if port 5000 is available
- Verify all environment variables are set
- Check MongoDB connection

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection (local or cloud)
3. Deploy to Heroku, Railway, or your preferred platform

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or your hosting platform
3. Configure environment variables for API endpoints

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check environment variables are correctly set

---

**Happy Skill Swapping! 🎉** 