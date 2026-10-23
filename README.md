# Sri Gandra Venkata Ramana Reddy — Official Political Portfolio Website
### శ్రీ గండ్ర వెంకట రమణా రెడ్డి అధికారిక వెబ్‌సైట్

A complete, production-ready, bilingual (**Telugu & English**) politician portfolio and public service web application for **Sri Gandra Venkata Ramana Reddy** (Senior Political Leader, Former Member of Legislative Assembly for Bhupalpally, and Former Government Chief Whip in the AP Legislative Assembly), featuring a dedicated section for his wife, **Smt. Gandra Jyothi** (Former Chairperson of Warangal Rural Zilla Parishad).

Built on the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with native **Netlify Serverless Deployment** support.

---

## ⚡ Running on NETLIFY

This project is pre-configured with `netlify.toml`, Netlify Serverless Functions (`netlify/functions/api.js`), and SPA routing rules for seamless deployment on Netlify.

### Method 1: Deploy via GitHub (Recommended)

1. **Push this project to your GitHub account:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Gandra Venkata Ramana Reddy portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Log in to [Netlify](https://app.netlify.com/).
   - Click **Add new site** → **Import an existing project**.
   - Choose **GitHub** and select your repository.

3. **Build Settings (Automatically Detected via `netlify.toml`):**
   - **Base directory:** *(Leave blank)*
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Functions directory:** `netlify/functions`

4. **Add Environment Variables in Netlify:**
   In your Netlify site dashboard, navigate to **Site configuration** → **Environment variables** → **Add a variable**:
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/gandra_db?retryWrites=true&w=majority`
   - `JWT_SECRET`: `gandra_venkata_ramana_reddy_secret_key_2026_telangana_prod`
   - `ADMIN_EMAIL`: `admin@gandrareddy.in`
   - `ADMIN_PASSWORD`: `Admin@12345`

5. Click **Deploy Site**. Your live website with all bilingual pages and admin dashboard will be live at `https://your-site-name.netlify.app`!

---

### Method 2: Deploy directly via Netlify CLI

You can also deploy instantly from your computer terminal without committing to Git:

```bash
# 1. Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Log in to Netlify
netlify login

# 4. Deploy live to production
netlify deploy --prod
```
*When prompted for the publish directory, confirm `frontend/dist`.*

---

## 🏛️ Key Features

### 1. Design & Authenticity
- **Hand-Crafted Editorial Layout**: Warm ivory (`#FDFBF7`), deep royal navy (`#0B2545`), Telangana dark green (`#134E35`), and restrained saffron accents (`#D95D1E`).
- **Authentic Leader Photographs**: Authorized high-resolution photos of Sri Gandra Venkata Ramana Reddy and Smt. Gandra Jyothi.
- **Zero Gimmicks**: No AI generic gradients, no exaggerated cards, no robotic corporate marketing language, and no fabricated claims.

### 2. Bilingual Experience (Telugu & English)
- **Natural, Professional Telugu**: Authored in dignified literary and political Telugu paired with Google Font `Noto Sans Telugu`.
- **Instant Language Switcher**: Persistent in `localStorage` across page visits (`తెలుగు` / `English`).
- Complete bilingual coverage: Navigation, Hero, About, Public Activities, Milestones, Visual Archive, Press Statements, Grievances, and Admin Portal.

### 3. Website Sections
- **Header & Navigation**: Personal monogram, responsive navigation links, bilingual toggle, and mobile menu drawer.
- **Hero Section**: Authentic leader portrait, verified credentials, and dignified public-service commitment.
- **About Section**: Namaste portrait, documented political journey, and four guiding public-service pillars.
- **Public Service & Activities**: Category filters (Grievance, Agriculture, Infrastructure, Welfare), verified dates, locations, and documentation reader.
- **Achievements & Milestones Timeline**: Chronological verified milestones with official badges.
- **Authorized Visual Archive (Photo Gallery)**: Responsive gallery with full-screen Lightbox viewer, keyboard navigation, and zoom.
- **News & Updates**: Official press announcements and statements with read modal and one-click sharing.
- **Dedicated Section for Smt. Gandra Jyothi**: Dignified, respectful, verified overview of her local governance leadership (former Warangal Rural ZP Chairperson) and her World Marathon Majors athletic milestone.
- **Citizen Contact & Camp Office**: Direct submission to constituency coordination team, office locations, and operational hours.
- **Official Footer**: Quick navigation, office addresses, copyright, and accessibility statement.

### 4. Admin Management Dashboard (`/admin`)
- **Secure Authentication**: JWT token-based authentication with bcrypt password hashing.
- **Biography & Roles Manager**: Update English and Telugu text live without touching code.
- **Smt. Gandra Jyothi Section Manager**: Control content and visibility.
- **Public Activities CRUD**: Add, edit, or delete activities with date, category, and images.
- **Milestones Timeline CRUD**: Add confirmed milestones.
- **Visual Archive Manager**: Photo uploads and management.
- **News Manager**: Draft and publish press statements.
- **Citizen Grievance Inbox**: Review citizen submissions, update status (*New*, *Under Review*, *Resolved*), and delete records.

---

## 🔐 Administrator Credentials

| Role | Email | Password | Admin Portal URL |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@gandrareddy.in` | `Admin@12345` | `/admin` |

---

## 💻 Local Development

- **Run Locally on Port 5000 (Express server + React SPA):**
  ```bash
  npm run build
  npm start
  ```
  Visit: `http://localhost:5000`

- **Run with Live Reload (Vite + Node watch):**
  - Terminal 1: `npm run server`
  - Terminal 2: `npm run client`
