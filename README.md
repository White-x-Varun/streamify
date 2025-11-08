# Streamify - Language Learning Chat App

A modern, real-time chat application designed for language learners to connect, practice conversations, and build friendships worldwide. Built with React, Node.js, Express, and MongoDB.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens
- **Profile Management**: Complete user profiles with language preferences, bio, and location
- **Friend System**: Send/receive friend requests and manage connections
- **Real-time Chat**: Instant messaging with friends (planned for future updates)
- **User Search**: Find language partners by name, native language, or learning language

### Advanced Features
- **Online Status**: See when friends are online with real-time status indicators
- **Admin Panel**: Comprehensive admin dashboard for user management and content moderation
- **Theme Support**: Multiple themes with dark/light mode support
- **Responsive Design**: Mobile-first design that works on all devices
- **Language Flags**: Visual language indicators for better user experience

### Implemented Features
- ✅ Message reactions and emojis
- ✅ File sharing capabilities
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Online/offline status tracking
- ✅ Content moderation features

### Planned Features
- Video calling integration
- Group chats
- Advanced admin analytics
- Push notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat_App-1-main
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5003
   MONGO_URI=mongodb://localhost:27017/streamify
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5003`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📱 Usage

### User Registration
1. Visit the signup page
2. Fill in your details (name, email, password)
3. Complete your profile during onboarding
4. Set your native language and language you're learning

### Finding Language Partners
1. Browse recommended users on the home page
2. Use the search feature to find specific users
3. Send friend requests to connect
4. Start chatting once requests are accepted

### Advanced Chat Features
- **Real-time Messaging**: Instant messaging with friends
- **Online Status**: See when friends are online/offline
- **Typing Indicators**: Know when someone is typing
- **Message Reactions**: React to messages with emojis
- **File Sharing**: Share files and media in chats
- **Read Receipts**: See when messages are read

### Admin Features
Admin users can access the admin panel at `/admin` to:
- View analytics and user statistics
- Manage users (ban/unban/delete)
- Moderate content and reported messages
- Configure system settings

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/recommended` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `POST /api/users/send-friend-request` - Send friend request
- `PUT /api/users/accept-friend-request` - Accept friend request
- `GET /api/users/outgoing-friend-requests` - Get outgoing requests
- `GET /api/users/friend-requests` - Get incoming requests
- `GET /api/users/search` - Search users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/status` - Update online status
- `GET /api/users/online` - Get online users

### Chat (Planned)
- `GET /api/chat/:userId` - Get chat with user
- `POST /api/chat/:userId` - Send message
- `GET /api/chat/messages/:chatId` - Get messages

## 🗂️ Project Structure

```
Chat_App-1-main/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility libraries
│   │   ├── pages/      # Page components
│   │   ├── store/      # State management
│   │   └── constants/  # App constants
│   └── main.jsx        # App entry point
└── README.md
```

## 🎨 Themes and Customization

The app supports multiple themes through DaisyUI. Current themes include:
- Forest (default)
- Dark
- Light
- And more...

Themes can be switched in the navbar using the theme selector.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DaisyUI](https://daisyui.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query) for data management
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy language learning! 🌍🗣️**
