# Streamify - Real-Time Chat and Video Calling App

A modern, full-stack chat application built with React, Node.js, Express, MongoDB, and Stream Chat SDK. Features real-time messaging, video calling, friend management, and more.

## 🚀 Live Demo

Check out the live application: [https://streamify-1-3ud1.onrender.com/](https://streamify-1-3ud1.onrender.com/)

## ✨ Features

- **Real-Time Messaging**: Instant chat with friends and groups
- **Video Calling**: High-quality video calls powered by Stream Video SDK
- **User Authentication**: Secure login/signup with JWT tokens
- **Friend System**: Add, manage, and chat with friends
- **Online Status**: See when friends are online
- **Theme Support**: Light and dark mode themes
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Notifications**: Real-time notifications for messages and calls
- **Admin Panel**: Administrative features for managing users
- **Search Functionality**: Find users and messages easily

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client for API calls
- **Stream Chat React** - Real-time chat components
- **Stream Video React SDK** - Video calling functionality
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Stream Chat SDK** - Real-time messaging backend
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse HTTP request cookies

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Stream Account** (for chat and video services)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat_App-1-main
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in both `backend` and `frontend` directories.

   **Backend (.env)**
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NODE_ENV=development
   ```

   **Frontend (.env)**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the application**

   **Development Mode:**
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

   **Production Build:**
   ```bash
   # Build the application
   npm run build

   # Start the production server
   npm start
   ```

5. **Access the application**

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
Chat_App-1-main/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── utils/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   └── ...
├── package.json
├── README.md
└── ...
```

## 🔧 Available Scripts

### Root Level
- `npm run build` - Install dependencies and build frontend
- `npm run start` - Start production backend

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This application is deployed on Render. The deployment process includes:

1. **Backend Deployment**: Node.js application on Render
2. **Frontend Deployment**: Static site hosting
3. **Database**: MongoDB Atlas
4. **Real-time Services**: Stream Chat and Video

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **JAISH DIWAKAR** - *Initial work*

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/chat/) - Real-time messaging platform
- [Stream Video](https://getstream.io/video/) - Video calling SDK
- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database

---

Made with ❤️ using React, Node.js, and Stream Chat
