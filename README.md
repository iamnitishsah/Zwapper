# Zwapper - Skill Swap Platform

A modern web application that connects people who want to learn and teach skills through mutual skill exchanges. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Profile Management**: Complete user profiles with skills, availability, and location
- **Skill Discovery**: Search and filter users by skills, location, and availability
- **Swap Requests**: Send and manage skill swap requests between users
- **Request Management**: Accept, reject, or cancel swap requests
- **Privacy Controls**: Public/private profile settings

### User Experience
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: Dynamic content updates without page refresh
- **Search & Filter**: Advanced search with multiple filters
- **Pagination**: Efficient data loading with pagination
- **Loading States**: Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool

## 📁 Project Structure

```
Zwipper/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── SwapRequest.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── requests.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── UserCard.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── Requests.jsx
│   │   │   └── Help.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/zwapper
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all public users (with filters)
- `GET /api/users/:username` - Get user profile by username
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/profile/me` - Get current user's profile

### Requests
- `POST /api/requests` - Create a new swap request
- `GET /api/requests` - Get user's requests (sent/received)
- `PUT /api/requests/:id/status` - Update request status
- `GET /api/requests/:id` - Get specific request details

## 🎯 Core Features Walkthrough

### 1. User Registration & Authentication
- Users can register with full name, email, username, and password
- JWT-based authentication with secure password hashing
- Protected routes for authenticated users

### 2. Profile Management
- Complete profile setup with skills, location, and availability
- Skills can be added/removed dynamically
- Availability settings for days and time slots
- Privacy controls (public/private profiles)

### 3. User Discovery
- Search users by skill name or username
- Filter by availability (days and time slots)
- Sort by newest or nearest location
- Pagination for large result sets

### 4. Swap Request System
- Send requests to users offering desired skills
- Specify what skill you'll teach in return
- Optional message for additional context
- Request validation (skills must match)

### 5. Request Management
- View sent and received requests
- Accept, reject, or cancel requests
- Track request status (pending, accepted, rejected, cancelled)
- Real-time status updates

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Start Vite dev server
```

### Database
The application uses MongoDB with the following collections:
- **Users**: User profiles and authentication data
- **SwapRequests**: Skill swap requests between users
- **Feedback**: User reviews and ratings (future feature)

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Primary blue theme with gray accents
- **Typography**: Inter font family for modern readability
- **Components**: Reusable components with consistent styling
- **Icons**: Lucide React icons throughout the application

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### User Experience
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Smooth Transitions**: CSS animations and transitions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured CORS for security
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for security headers

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with the MERN stack
- Icons from Lucide React
- Styling with Tailwind CSS
- Icons and UI inspiration from modern design systems

---

**Zwapper** - Connecting people through skill sharing and mutual learning. 