# Kommireddy Sai Durga Nivas — Professional Portfolio

A high-performance, dark-obsidian developer portfolio built with React 19, Vite, Tailwind CSS v4, Motion (framer-motion v12), and Lucide React.

## Features
- **Modern Obsidian Aesthetic**: Smooth spotlight canvas glow, glassmorphic cards, and accent switcher (Cyan, Violet, Emerald, Amber, Rose).
- **Interactive Bento Showcase**: Filterable project gallery with detailed modal case studies.
- **Experience & Education**: Timeline of verified credentials, internships, and academic achievements.
- **Admin Dashboard**: LocalStorage-persisted management for editing bio, projects, certifications, messages, and avatar image.
- **Zero Configuration Backend**: Fully client-side with zero external database dependencies required for deployment.

---

## Deploying to Vercel

This repository is pre-configured for one-click deployment to **[Vercel](https://vercel.com/)**.

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push this project to your **GitHub** account:
   ```bash
   git init
   git add .
   git commit -m "Deploy to Vercel"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your GitHub repository.
4. Vercel automatically detects the configuration from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your portfolio will be live in under 60 seconds with automatic SSL and global CDN distribution!

### Method 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. In the project root directory, run:
   ```bash
   vercel
   ```
3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the local dev server**:
   ```bash
   npm run dev
   ```
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Preview production build locally**:
   ```bash
   npm run preview
   ```
