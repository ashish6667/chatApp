# ChatApp 💬

A real-time, WhatsApp-like chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO.

## 🚀 Live Demo
You can access the live application here:
👉 **[https://chat-app-499s.vercel.app](https://chat-app-499s.vercel.app)**

---

## ✨ Features
* **Real-time Messaging**: Instant message delivery and receipt powered by Socket.IO.
* **Online/Offline User Status**: Real-time status indicator showing which contacts are currently active.
* **Profile Picture Settings**: Upload, update, and remove your custom profile avatar.
* **Persistent Chat History**: Previous chats and messages are stored securely in MongoDB and loaded automatically.
* **Responsive Dark UI**: Sleek, modern, premium UI styled with Tailwind CSS.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Vite, Tailwind CSS, Zustand (state management), Axios
* **Backend**: Node.js, Express.js, Socket.IO, JWT (JSON Web Tokens)
* **Database**: MongoDB (via Mongoose)
* **Hosting**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 💻 Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ashish6667/ChatApp.git
   cd ChatApp
   ```

2. **Configure Environment Variables**:
   * Create a `.env` file in the `Backend` directory:
     ```env
     PORT=5001
     JWT_TOKEN=your_jwt_secret
     MONGODB_URI=mongodb://localhost:27017/chatapp
     ```
   * Create a `.env` file in the `Frontend` directory:
     ```env
     VITE_API_BASE_URL=http://localhost:5001/api
     ```

3. **Install Dependencies & Run**:
   * **Backend**:
     ```bash
     cd Backend
     npm install
     npm run dev
     ```
   * **Frontend**:
     ```bash
     cd ../Frontend
     npm install
     npm run dev
     ```
   * Open `http://localhost:3001` in your browser.
