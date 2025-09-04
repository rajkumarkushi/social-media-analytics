Analytics Platform

A full-stack social media analytics platform built with **Next.js (TypeScript)**, **Node.js/Express**, **PostgreSQL**, and **Redis**.  
Implements auth (JWT + refresh tokens), accounts management, analytics (with chart + filters), CSV/PDF export, and an admin panel.

---

## 🚀 Features

### 🔑 Authentication
- Login, Register, Forgot Password (Next.js App Router)
- JWT access tokens + **refresh tokens stored in Redis**
- Protected APIs via middleware (`protect`)
- Admin-only routes via `is_admin` flag and `isAdmin` middleware

### 📊 Dashboard
- Global **layout** with sidebar + top navbar
- Summary cards: **Total Users**, **Your Accounts**, **Analytics Records**
- **Recent Activity** (last 5 analytics entries)

### 🧑‍💼 Accounts
- Add / list / delete accounts (per user)
- Stored in PostgreSQL

### 📈 Analytics
- Add analytics data (provider, followers, likes, shares)
- Filter by provider and date range
- Recharts **line chart**
- **Export CSV & PDF** reports

### 🛠️ Admin Panel
- List all users
- Delete non-admin users
- Link visible only to admins

---

## 🏗️ Tech Stack
- **Frontend:** Next.js (TypeScript, App Router), TailwindCSS, Recharts
- **Backend:** Node.js, Express
- **DB:** PostgreSQL
- **Cache/Session:** Redis
- **Auth:** JWT (access + refresh)

---

## 📂 Project Structure

root/
├─ backend/
│ ├─ src/
│ │ ├─ config/ # db.ts, redis.ts
│ │ ├─ controllers/ # auth, accounts, analytics, dashboard, admin
│ │ ├─ middleware/ # authMiddleware, adminMiddleware
│ │ ├─ routes/ # authRoutes, accountRoutes, analyticsRoutes, adminRoutes, dashboardRoutes
│ │ └─ server.js
│ └─ package.json
├─ social-media-analytics/ # Next.js frontend (App Router)
│ ├─ src/
│ │ ├─ app/
│ │ │ ├─ auth/ (login, register, forgot-password)
│ │ │ └─ dashboard/ (layout, page, accounts, analytics, admin)
│ │ └─ lib/api.ts
│ └─ package.json
├─ .gitignore
└─ README.md

yaml
Copy code

---

## ✅ Prerequisites

- **Node.js** 18+  
- **PostgreSQL** 14+ running locally  
- **Redis** running locally (default port 6379)

---

## ⚙️ Environment Variables

Create `backend/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/social_media_analytics
JWT_SECRET=your_jwt_secret

# Optional (defaults ok)
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# If you use a custom Redis connection string:
# REDIS_URL=redis://localhost:6379
Make sure your Postgres DB name, user, and password match your local setup.

🗄️ Database Prep
Run these in your PostgreSQL (pgAdmin or psql) if you haven’t already created tables:

sql
Copy code
-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Accounts
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  followers INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  shares INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
Make your test user an admin (optional):

sql
Copy code
UPDATE users SET is_admin = true WHERE email = 'youradmin@email.com';
▶️ Run the App (Dev)
1) Start Redis
bash
Copy code
redis-cli ping   # Should return PONG
# If Redis isn’t running yet:
# redis-server
2) Backend
bash
Copy code
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
3) Frontend
bash
Copy code
cd social-media-analytics
npm install
npm run dev
# Runs on http://localhost:3000
🔒 Auth Flow (Quick)
Login/Register → receive access token (used in Authorization: Bearer header)

Refresh token is stored in Redis, used by backend to issue new access tokens

📤 Report Exports
CSV: GET /api/reports/csv (frontend buttons call this)

PDF: GET /api/reports/pdf

🧪 Admin Endpoints
GET /api/admin/users — list users (admin only)

DELETE /api/admin/users/:id — delete user (admin only)

🧭 Frontend Pages
/auth/login, /auth/register, /auth/forgot-password

/dashboard (summary + recent activity)

/dashboard/accounts

/dashboard/analytics

/dashboard/admin (admins only)

## 📸 Screenshots

### 🔑 Login Page
![Login](./assets/login.png)

### 🔑 signup Page
![Login](./assets/signup.png)

### 🔑 Forgot password
![Login](./assets/Forgot_password.png)

### 📊 Dashboard
![Dashboard](./assets/dashboard_overview.png)

### 📈 Analytics
![Analytics](./assets/dashboard_analytics.png)

### Accounts
![Accounts](./assets/dashboard_accounts.png)

### reports
![reports](./assets/dashboard_reports.png)

### recent activity
![recent activity](./assets/recent_activity.png)

###dashboard admin
![admin](./assets/dashboard_admin.png)

🧹 Scripts
Backend:

bash
Copy code
npm run dev   # start with nodemon
Frontend:

bash
Copy code
npm run dev   # next dev
🧾 License
For assignment/demo purposes.

👤 Author
Enduri Rajkumar — GitHub