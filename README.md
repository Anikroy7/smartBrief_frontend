# SmartBrief — AI-Powered Content Summarization SaaS

SmartBrief is a full-stack SaaS application that enables users to quickly summarize content using OpenAI or Google Gemini APIs. Users can paste text or upload .txt / .docx files, and receive summarized output instantly.

The system includes role-based access control, a credit system, background processing, and caching with Redis to optimize performance and cost.

---

## Live Links

- *Frontend*: [https://frontend-nine-zeta-26.vercel.app](https://frontend-nine-zeta-26.vercel.app)
- *Backend*: [https://backend-one-murex-49.vercel.app](https://backend-one-murex-49.vercel.app)

---

## Test Credentials

### 👤 User
- *Email*: user@gmail.com
- *Password*: 123456

###  Admin
- *Email*: admin@gmail.com
- *Password*: 123456

### Editor
- *Email*: editor@gmail.com
- *Password*: 123456

### Reviewer
- *Email*: reviewer@gmail.com
- *Password*: 123456

---

## Tech Stack

- *Frontend*: React.js, Redux Toolkit, Tailwind CSS
- *Backend*: Node.js, Express.js, MongoDB, TypeScript
- *Authentication*: JWT
- *AI Integration*: OpenAI GPT-3.5 / Gemini API
- *Background Job*: Bull & Redis
- *Caching*: Redis (per user + prompt + content)
- *Deployment*: Vercel (Frontend), Render (Backend)

---

## Features

-  JWT Authentication with hashed passwords
-  Role-based Access Control:
  - *Admin*: Full access
  - *Editor*: Edit/delete any summary
  - *Reviewer*: View all summaries
  - *User*: Manage own summaries only
-  Credit System:
  - New users start with 5 credits
  - 1 credit = 1 summary request
  - Admin can recharge user credits
-  File Upload Support (.txt, .docx)
-  Re-prompting with updated instructions
-  Smart Caching with Redis to avoid duplicate summaries
-  Background job processing for summarization
-  Daily cron job to deactivate inactive users (7+ days)

---

## ⚙ Installation & Setup

### 1. Fronted Setup

bash
git clone https://github.com/Anikroy7/smartBrief_frontend.git
cd smartBrief_frontend
npm install
npm run dev


### 1. Backend  Setup

bash
git clone https://github.com/Anikroy7/smartBrief_backend.git
cd smartBrief_backend
npm install
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
npm run start:dev
npm run summaryWorker:dev

### 📝 Backend `.env.example` file

`
## 🔐 Environment Variables Setup For Backend

To run the backend server, you need to configure environment variables.  
Create a .env file in the smartBrief_backend/ directory and include the following keys.

You can start by copying from the provided .env.example file:

bash
cp .env.example .env

PORT=5000

# MongoDB
DATABASE_URL=your_mongodb_connection_string

# AI Key (Google Gemini)
GEMINI_API_KEY=your_gemini_key

# Bcrypt
BCRYPT_SALT_ROUND=2

# App Environment
NODE_ENV=development

# JWT Auth
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=10h

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password

`


`
## 🔐 Environment Variables Setup For Frontedn

VITE_SERVER_BASE_URL= your_base_url

`