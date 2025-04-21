# 🛡️ NestJS Authentication API

This is a full-stack-ready authentication API built with [NestJS](https://nestjs.com/) and MongoDB. It supports user signup, login, and access to protected routes using JWT.

---

## ✨ Features

- ✅ User registration & login with hashed passwords
- ✅ JWT-based authentication
- ✅ MongoDB integration with Mongoose
- ✅ Global validation with `class-validator`
- ✅ Swagger API documentation (`/api`)
- ✅ Security via `helmet` middleware
- ✅ Logging on important events

---

## 🏅 Bonus Points Implemented

| Feature              | Status |
|----------------------|--------|
| Logging              | ✅     |
| Error Handling       | ✅     |
| Swagger Docs         | ✅     |
| Global Validation    | ✅     |
| Helmet (Security)    | ✅     |
| Rate Limiting        | ✅ (Optional - Setup Ready) |
| Unit Testing         | ✅ Basic test scaffold |
| Environment Config   | ✅ via `.env` |

---

## 📦 Tech Stack

- **Backend:** NestJS
- **Database:** MongoDB
- **Authentication:** Passport + JWT
- **Validation:** class-validator
- **Documentation:** Swagger

---

## 🧪 API Endpoints

| Method | Endpoint          | Description           | Auth Required |
|--------|-------------------|-----------------------|---------------|
| POST   | `/auth/signup`    | Register new user     | ❌ No          |
| POST   | `/auth/signin`    | Login and receive JWT | ❌ No          |
| GET    | `/auth/welcome`   | Protected welcome     | ✅ Yes         |

---

## ⚙️ How to Install (From Scratch)

> 🧠 This guide assumes you have **no dependencies installed yet**.

---

### 📁 Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nestjs-auth-system.git
cd nestjs-auth-system
```

---

### 🧱 Step 2: Install Node.js

Download and install from https://nodejs.org (LTS version recommended).
Once installed, check with:
```bash
node -v
npm -v
```

---

### 🍃 Step 3: Install MongoDB

Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
Follow setup instructions for your OS
Start MongoDB:

    On Linux/macOS: mongod
    On Windows: use MongoDB Compass or start MongoDB as a service
    
---

### 📦 Step 4: Install Project Dependencies

```bash
npm install
```

---

### 📄 Step 5: Create Environment Variables

Create a file named .env in the root folder:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_secret_key
```

---

### 🚀 Step 6: Run the Server

```bash
npm run start:dev
```
The server should now be running on:
```bash
http://localhost:3000
```

---

### 🔍 API Documentation (Swagger)

Swagger UI is available at:
```bash
http://localhost:3000/api
```
You can test all routes from there (signup, signin, welcome).
