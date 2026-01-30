# internflow-base
Internship &amp; Task Management System

# 📦 BPH Technologies – Base GitHub Template (MERN)

This repository is the **single source template** for ALL 16 internship projects.
Interns must **fork this repo** and follow the same structure.

---

## 📁 Folder Structure (Do NOT change)
```
project-name/
│
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/                 # Node + Express Backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── docs/
│   ├── api-spec.md
│   ├── db-schema.md
│   └── screenshots/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🔐 Mandatory Features (All Projects)
- JWT Authentication
- Role-Based Access Control (RBAC)
- CRUD APIs
- Dashboard (Admin/User)
- GitHub daily commits

---

## 🚀 Getting Started

### Backend Setup
```bash
cd server
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
npm install --save-dev nodemon
npm run dev
**### Add backend start script (package.json)**
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}```
mkdir controllers models routes middleware config


### Frontend Setup
```bash
come back root folder
npx create-react-app client
cd client
npm install axios react-router-dom
npm install concurrently --save-dev
npm init -y

**Root package.json (create one if needed)**
"scripts": {
  "client": "npm start --prefix client",
  "server": "npm run dev --prefix server",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
npm run dev

---

## 🧪 GitHub Rules (Strict)
- No direct commits to `main`
- All work must be on `dev` branch
- Daily commit required
- PR mandatory for merge

---

## 📝 Commit Message Format
```
Day-03 | Implemented authentication middleware
```

---

## 🎓 Internship Completion Criteria
- Minimum 10 days commits
- Working frontend & backend
- Final demo
- README updated

---

## 🏆 Certificate Note
This project follows **industry GitHub workflow standards** including
branching, PR reviews, and code collaboration.

---

© BPH Technologies | MERN Stack Internship

---

## 📘 Standard README Template (Copy–Paste for All Internship Projects)

```md

## 📌 Project Overview

## InternFlow – Internship & Task Management System

## Problem It Solves:

Managing large batches of interns manually using WhatsApp and Excel leads to poor
attendance tracking, missed task submissions, no performance visibility, and manual
certificate decisions.
Project Overview:
InternFlow is an internal SaaS-style platform used by IT companies to manage intern
onboarding, daily tasks & submissions, attendance tracking, and performance
evaluation. Interns build a simplified but real industry version of this system.

## Core Features:
• Authentication Module (JWT-based, Admin/Intern roles)
• Intern Dashboard (view tasks, submit work, check attendance)
• Task Management (Admin creates tasks, assigns deadlines, views submissions)
• Attendance Module (daily check-in, attendance summary)
• Performance Tracker (calculates task completion %, attendance %, eligibility for
3/6/12 month internship)

## Real-World Use:
Used internally by BPH Technologies and IT companies for internship management

## 🛠️ Tech Stack
**Frontend:** React.js, Tailwind CSS / Bootstrap
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Authentication:** JWT
**Version Control:** Git & GitHub

---

## ✨ Key Features
- User Authentication (Login / Register)
- Role-Based Access Control
- CRUD Operations
- Dashboard & Reports
- Responsive UI

---

## 📂 Folder Structure
```
client/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   ├── context/
  │   └── App.js

server/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── config/
  └── server.js
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB
- Git

### Steps
```bash
# Clone repository
git clone <repo-url>

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd client
npm install
npm start
```

---

## 👥 Team Details
- Team Name: 
- Team Lead: 
- Team Members:

---

## 📅 Internship Duration
- Duration: 2 Weeks
- Organization: **BPH Technologies**

---

## 📸 Screenshots / Demo
(Add screenshots or demo video link here)

---

## 📜 Learning Outcomes
- MERN stack fundamentals
- API design & integration
- GitHub collaboration
- Real-world project workflow

---

## 🏆 Certificate
This project is developed as part of the **BPH Technologies MERN Stack Internship Program**.

---

## 📬 Contact
For queries, contact: contact@brightpathhorizon.com 
**BPH Technologies**

```

