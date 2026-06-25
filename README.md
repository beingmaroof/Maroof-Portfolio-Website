# Maroof Ahmed — Personal Portfolio Website

A premium, recruiter-ready personal portfolio website built with vanilla HTML5, CSS3, and JavaScript. Inspired by Apple, Linear, Framer, Stripe, and Vercel design language.

---

## ✨ Features

- **10 Complete Sections**: Hero, About, Skills, Projects, Certifications, Awards, Experience, Education, Contact, Footer
- **Dark / Light Theme Toggle** with localStorage persistence
- **GSAP Animations** — hero entrance, scroll-triggered reveals
- **Typed.js Typewriter** — cycling role titles in hero
- **AOS Scroll Reveal** — smooth section entrances
- **Custom Cursor** with hover effects (desktop)
- **Animated Stats Counter** — number count-up on scroll
- **Skill Category Tabs** — filterable skill pills
- **Fully Responsive** — mobile, tablet, desktop
- **EmailJS Contact Form** — with real-time validation
- **Resume Download Button**
- **SEO Optimized** — title, meta, Open Graph, Twitter Card
- **Accessible** — ARIA labels, focus rings, reduced motion support

---

## 📁 Folder Structure

```
Maroof Portfolio website/
├── index.html                 # Main single-page HTML
├── css/
│   ├── style.css              # Design system + all section styles
│   ├── animations.css         # Keyframes, hover effects, transitions
│   └── responsive.css         # Mobile-first breakpoints
├── js/
│   ├── main.js                # Nav, theme, scroll, tabs, counters
│   ├── animations.js          # GSAP, AOS, Typed.js, cursor
│   └── contact.js             # EmailJS form integration
├── assets/
│   ├── images/
│   │   ├── profile.png        # Your profile photo
│   │   ├── pixen-preview.png  # Pixen India Digital screenshot
│   │   ├── arvaux-preview.png # Arvaux screenshot
│   │   └── snaplist-preview.png # SnapList screenshot
│   ├── resume/
│   │   └── Maroof_Ahmed_Resume.pdf  ← Add your resume here
│   └── favicon/
│       └── favicon.svg        # MA monogram favicon
└── README.md
```

---

## 🚀 Quick Start

1. **Clone / Download** this project
2. Open `index.html` in your browser — no build step needed!

For a live reload during development:
```bash
# Using VS Code Live Server extension (recommended)
Right-click index.html → "Open with Live Server"

# Or using Python:
python -m http.server 8000
# Then open http://localhost:8000
```

---

## ⚙️ Personalization Checklist

Before deploying, update these items:

### 🔴 Required
- [ ] **`assets/resume/Maroof_Ahmed_Resume.pdf`** — Drop your actual resume PDF here
- [ ] **Email address** — Replace `maroofahmed@example.com` everywhere in `index.html`
- [ ] **LinkedIn URL** — Replace `linkedin.com/in/maroofahmed` with your real URL
- [ ] **GitHub URL** — Replace `github.com/maroofahmed` with your real URL
- [ ] **Project GitHub links** — Update the `#` placeholder hrefs for Arvaux and SnapList
- [ ] **Profile photo** — Replace `assets/images/profile.png` with your actual photo

### 🟡 EmailJS Setup (Contact Form)
1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (Gmail works great)
3. Create a Template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Open `js/contact.js` and replace:
   ```js
   publicKey:  'YOUR_EMAILJS_PUBLIC_KEY',
   serviceId:  'YOUR_EMAILJS_SERVICE_ID',
   templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
   ```

### 🟢 Optional
- [ ] **Profile photo** — Replace the AI-generated avatar with a real photo (same path)
- [ ] **Arvaux live link** — Add live demo URL if deployed
- [ ] **SnapList live link** — Add live demo URL if deployed
- [ ] **Open Graph image** — Add an `assets/images/og-image.png` (1200×630px)

---

## 🌐 Deployment

### GitHub Pages (Free)
1. Push this folder to a GitHub repository
2. Go to Repository → Settings → Pages
3. Set Source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Vercel (Recommended — Free)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository → Deploy
4. Get a free `.vercel.app` domain instantly

### Netlify (Alternative — Free)
1. Drag and drop this folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Get a live URL immediately

---

## 🛠️ Tech Stack

| Technology     | Purpose                        |
|---------------|-------------------------------|
| HTML5          | Structure & semantics          |
| CSS3           | Styling & design system        |
| JavaScript ES6 | Interactivity & logic          |
| GSAP 3         | Hero animations, scroll effects|
| AOS            | Scroll-triggered reveals       |
| Typed.js       | Typewriter effect              |
| Font Awesome 6 | Icons                          |
| EmailJS        | Contact form backend           |
| Google Fonts   | Inter + JetBrains Mono         |

---

## 📄 License

This portfolio is for personal use by **Maroof Ahmed**.  
Feel free to use this as inspiration, but please don't copy it wholesale as your own portfolio.

---

*Built with ♥ by Maroof Ahmed — 2025*
