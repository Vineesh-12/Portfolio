# Katta Vineesh Reddy | Full-Stack & DevOps Portfolio

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_HTML/CSS/JS-030303?style=for-the-badge&logo=javascript)

> **Live Demo:** [vineesh-reddy.vercel.app](https://vineesh-reddy.vercel.app/) *(Replace with your actual Vercel URL if different)*

A highly-optimized, framework-less professional portfolio designed to showcase Full-Stack development and Cloud/DevOps infrastructure skills. Built entirely with vanilla web technologies to demonstrate core browser understanding and maximize performance.

## ⚡ Features & Micro-Interactions

This project deliberately avoids heavy libraries (like React, GSAP, or Three.js) and implements advanced UI/UX mechanics using raw DOM manipulation and CSS math:

- **Matrix Text Scramble:** Custom `IntersectionObserver` class that decodes section headers in real-time as they enter the viewport.
- **3D Tilt Glassmorphism:** Real-time calculation of cursor `(X, Y)` coordinates to apply dynamic `rotateX` and `rotateY` transforms on project cards.
- **Magnetic Call-to-Actions:** Buttons physically pull towards the user's cursor within a defined radius using cubic-bezier transitions.
- **Cinematic Noise Overlay:** An inline SVG fractal noise filter (`mix-blend-mode: overlay`) applied globally for a premium, matte visual aesthetic.
- **Serverless Form Processing:** Contact form routing managed entirely client-side via FormSubmit API.

## 🛠 Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** CSS3 (Variables, CSS Grid/Flexbox, Backdrop Filters)
- **Logic:** Vanilla ES6 JavaScript
- **Deployment:** Vercel / GitHub Pages
- **Backend (Forms):** FormSubmit.co

## 🚀 Running Locally

Because this project uses zero build steps, bundlers, or package managers, running it locally is instantaneous.

1. Clone the repository:
   ```bash
   git clone https://github.com/Vineesh-12/Portfolio.git
   ```
2. Navigate to the directory:
   ```bash
   cd Portfolio
   ```
3. Spin up a local server to ensure the contact form endpoints work correctly:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and visit: `http://localhost:8000`

## 📬 Contact

- **LinkedIn:** [Your LinkedIn URL]
- **GitHub:** [@Vineesh-12](https://github.com/Vineesh-12)
- **Email:** [Your Email Address]

---
*Designed & Engineered by Katta Vineesh Reddy.*
