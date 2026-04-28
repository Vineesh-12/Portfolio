/* ================================================================
   VINEESH REDDY — PORTFOLIO SCRIPTS (Industry Standard 2025)
   ================================================================ */

/* ---- Preloader ---- */
window.addEventListener('load', () => {
    setTimeout(() => {
        const pre = document.getElementById('preloader');
        if (pre) pre.classList.add('hide');
    }, 600);
});

/* ---- Scroll Progress Bar ---- */
window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = pct + '%';

    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);

    /* Active nav link */
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    /* Spotlight follows scroll */
    updateSpotlight(lastMX, lastMY);
}

/* ================================================================
   PARTICLE CANVAS — Hero Background
   ================================================================ */
(function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const PARTICLE_COUNT = 80;
    const CONNECT_DIST   = 130;

    function randomParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2,
        };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(randomParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const opacity = (1 - dist / CONNECT_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
                    ctx.lineWidth = 0.7;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
            ctx.fill();
        });
    }

    function update() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });
    }

    function loop() {
        update();
        draw();
        animId = requestAnimationFrame(loop);
    }
    loop();

    // Mouse repulsion
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        particles.forEach(p => {
            const dx = p.x - mx, dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                const force = (80 - dist) / 80;
                p.vx += (dx / dist) * force * 0.8;
                p.vy += (dy / dist) * force * 0.8;
                // Clamp speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5; }
            }
        });
    }, { passive: true });
})();

/* ================================================================
   SPOTLIGHT CURSOR EFFECT
   ================================================================ */
let lastMX = -9999, lastMY = -9999;
const spotlight = document.getElementById('cursor-spotlight');

document.addEventListener('mousemove', e => {
    lastMX = e.clientX;
    lastMY = e.clientY;
    updateSpotlight(e.clientX, e.clientY);

    // Custom cursor
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot)  { dot.style.left  = e.clientX + 'px'; dot.style.top  = e.clientY + 'px'; }
    if (ring) {
        setTimeout(() => {
            ring.style.left = e.clientX + 'px';
            ring.style.top  = e.clientY + 'px';
        }, 80);
    }
}, { passive: true });

function updateSpotlight(x, y) {
    if (!spotlight) return;
    spotlight.style.left = x + 'px';
    spotlight.style.top  = y + 'px';
}

// Cursor expand on hoverable elements
document.querySelectorAll('a, button, .btn-main, .btn-ghost, .btn-resume, .project-card, .service-card, .tl-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.querySelector('.cursor-ring')?.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.querySelector('.cursor-ring')?.classList.remove('hovered'));
});

/* ================================================================
   HAMBURGER MENU
   ================================================================ */
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

ham?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = ham.querySelector('i');
    if (icon) icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = ham?.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    });
});

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* ================================================================
   TYPING EFFECT
   ================================================================ */
const phrases = ['Full Stack Developer', 'DevOps Engineer', 'Cloud Computing Expert', 'CI/CD Architect'];
let pi = 0, ci = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    if (!typedEl) return;
    const cur = phrases[pi];
    if (isDeleting) {
        typedEl.textContent = cur.substring(0, --ci);
        if (ci === 0) { isDeleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    } else {
        typedEl.textContent = cur.substring(0, ++ci);
        if (ci === cur.length) { isDeleting = true; setTimeout(type, 2200); return; }
    }
    setTimeout(type, isDeleting ? 45 : 95);
}
setTimeout(type, 1400);

/* ================================================================
   INTERSECTION OBSERVER — Staggered Reveals
   ================================================================ */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

/* ================================================================
   ANIMATED COUNTER
   ================================================================ */
function animateCount(el) {
    const target  = parseFloat(el.dataset.count);
    const decimal = parseInt(el.dataset.decimal) || 0;
    const suffix  = el.dataset.suffix || '';
    const duration = 1800;
    const steps    = duration / 16;
    const step     = target / steps;
    let current    = 0;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = decimal ? current.toFixed(decimal) + suffix : Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
    }, 16);
}

const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ================================================================
   SKILL BAR ANIMATION
   ================================================================ */
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const w = e.target.dataset.width;
            setTimeout(() => { e.target.style.width = w + '%'; }, 250);
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.bar-fill').forEach(el => barObs.observe(el));

/* ================================================================
   3D CARD TILT
   ================================================================ */
document.querySelectorAll('.project-card, .service-card, .skill-cat, .cert-card, .tl-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const x     = e.clientX - rect.left;
        const y     = e.clientY - rect.top;
        const cx    = rect.width  / 2;
        const cy    = rect.height / 2;
        const rotX  = ((y - cy) / cy) * -6;
        const rotY  = ((x - cx) / cx) *  6;
        card.style.transform    = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
        card.style.transition   = 'transform 0.1s ease';
        card.style.zIndex       = '5';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        card.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
        card.style.zIndex     = '';
    });
});

/* ================================================================
   MAGNETIC BUTTONS
   ================================================================ */
document.querySelectorAll('.btn-main, .btn-ghost, .btn-resume, .hero-socials a').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
        btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform  = 'translate(0,0)';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
});

/* ================================================================
   TEXT SCRAMBLE ON SECTION TITLES
   ================================================================ */
class TextScramble {
    constructor(el) {
        this.el    = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#';
        this.update = this.update.bind(this);
    }
    setText(text) {
        const len = Math.max(this.el.innerText.length, text.length);
        const promise = new Promise(r => this.resolve = r);
        this.queue = Array.from({ length: len }, (_, i) => ({
            from: this.el.innerText[i] || '',
            to:   text[i] || '',
            start: Math.floor(Math.random() * 35),
            end:   Math.floor(Math.random() * 35) + 35,
        }));
        cancelAnimationFrame(this.raf);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let out = '', done = 0;
        this.queue.forEach(q => {
            let { from, to, start, end, char } = q;
            if (this.frame >= end) { done++; out += to; }
            else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) { q.char = this.chars[Math.floor(Math.random() * this.chars.length)]; }
                out += `<span style="opacity:.4;color:var(--primary)">${q.char}</span>`;
            } else { out += from; }
        });
        this.el.innerHTML = out;
        if (done === this.queue.length) { this.resolve(); }
        else { this.raf = requestAnimationFrame(this.update); this.frame++; }
    }
}

const titleObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.scrambled) {
            e.target.dataset.scrambled = '1';
            const orig = e.target.innerText;
            new TextScramble(e.target).setText(orig);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(t => titleObs.observe(t));

/* ================================================================
   PAGE VISIBILITY — TAB TITLE EASTER EGG
   ================================================================ */
const origTitle = document.title;
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '👋 Come back soon!' : origTitle;
});

/* ================================================================
   PIPELINE STAGE TOOLTIPS — hover description
   ================================================================ */
const stageDesc = {
    'PUSH':       'Developer pushes code to GitHub',
    'BUILD':      'Jenkins triggers automated build & tests',
    'IMAGE':      'Docker image built, tagged & pushed to registry',
    'PROVISION':  'Terraform provisions VPC, EC2 & AWS infra',
    'CONFIGURE':  'Ansible configures server dependencies',
    'ORCHESTRATE':'Kubernetes schedules & scales containers',
    'LIVE':       '✅ Application live on AWS Production',
};

document.querySelectorAll('.ps-node-label').forEach(label => {
    const text = label.textContent.trim();
    if (stageDesc[text]) {
        const node = label.closest('.ps-node');
        if (node) node.setAttribute('title', stageDesc[text]);
    }
});

/* ================================================================
   AMBIENT GLOW ORBS — mouse parallax
   ================================================================ */
const orbs = document.querySelectorAll('.ambient-glow-1, .ambient-glow-2');
document.addEventListener('mousemove', e => {
    const xPct = e.clientX / window.innerWidth  - 0.5;
    const yPct = e.clientY / window.innerHeight - 0.5;
    orbs.forEach((orb, i) => {
        const factor = i === 0 ? 20 : -15;
        orb.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
    });
}, { passive: true });

/* ================================================================
   ACTIVE NAV HIGHLIGHT — IntersectionObserver variant
   ================================================================ */
const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ================================================================
   CONTACT FORM — floating label animation
   ================================================================ */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check on load (e.g. autofill)
    if (input.value) input.classList.add('has-value');
    input.addEventListener('input', () => {
        input.classList.toggle('has-value', input.value.trim().length > 0);
    });
    input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
    input.addEventListener('blur',  () => input.parentElement?.classList.remove('focused'));
});

/* ================================================================
   SMOOTH COUNTER — ensure hero stats trigger even before scroll
   ================================================================ */
window.addEventListener('load', () => {
    document.querySelectorAll('.hero-stats [data-count]').forEach(el => {
        setTimeout(() => animateCount(el), 1000);
    });
});