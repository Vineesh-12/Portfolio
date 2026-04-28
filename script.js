/* ================================================================
   VINEESH REDDY — PORTFOLIO SCRIPTS
   ================================================================ */

/* ---- Preloader — fast, not flashy ---- */
window.addEventListener('load', () => {
    setTimeout(() => {
        const pre = document.getElementById('preloader');
        if (pre) pre.classList.add('hide');
    }, 300);
});

/* ---- Scroll: progress bar, nav state, back-to-top ---- */
window.addEventListener('scroll', handleScroll, { passive: true });

function handleScroll() {
    const h   = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = pct + '%';

    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('back-top')?.classList.toggle('show', window.scrollY > 400);

    // Spotlight follows scroll offset
    updateSpotlight(lastMX, lastMY);
}

/* ================================================================
   CUSTOM CURSOR (Spotlight only — no competing dot+ring)
   ================================================================ */
let lastMX = -9999, lastMY = -9999;
const spotlight = document.getElementById('cursor-spotlight');

document.addEventListener('mousemove', e => {
    lastMX = e.clientX;
    lastMY = e.clientY;
    updateSpotlight(e.clientX, e.clientY);

    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot)  { dot.style.left  = e.clientX + 'px'; dot.style.top  = e.clientY + 'px'; }
    if (ring) {
        setTimeout(() => {
            ring.style.left = e.clientX + 'px';
            ring.style.top  = e.clientY + 'px';
        }, 70);
    }
}, { passive: true });

function updateSpotlight(x, y) {
    if (!spotlight) return;
    spotlight.style.left = x + 'px';
    spotlight.style.top  = y + 'px';
}

document.querySelectorAll('a, button, .btn-main, .btn-ghost, .btn-resume, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.querySelector('.cursor-ring')?.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.querySelector('.cursor-ring')?.classList.remove('hovered'));
});

/* ================================================================
   PARTICLE CANVAS — Restrained (45 particles, no mouse repulsion)
   ================================================================ */
(function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT        = 45;
    const CONNECT_DIST = 120;

    const particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * (window.innerWidth  || 1200),
        y:  Math.random() * (window.innerHeight || 800),
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r:  Math.random() * 1.2 + 0.4,
        a:  Math.random() * 0.35 + 0.12,
    }));

    function frame() {
        ctx.clearRect(0, 0, W, H);

        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / CONNECT_DIST) * 0.14})`;
                    ctx.lineWidth   = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Dots
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,102,241,${p.a})`;
            ctx.fill();

            // Move
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });

        requestAnimationFrame(frame);
    }
    frame();
})();

/* ================================================================
   AMBIENT ORB PARALLAX — subtle, won't fight content
   ================================================================ */
const orbs = document.querySelectorAll('.ambient-glow-1, .ambient-glow-2');
let orbRaf;
document.addEventListener('mousemove', e => {
    cancelAnimationFrame(orbRaf);
    orbRaf = requestAnimationFrame(() => {
        const xPct = e.clientX / window.innerWidth  - 0.5;
        const yPct = e.clientY / window.innerHeight - 0.5;
        orbs.forEach((orb, i) => {
            orb.style.transform = `translate(${xPct * (i === 0 ? 18 : -12)}px, ${yPct * (i === 0 ? 18 : -12)}px)`;
        });
    });
}, { passive: true });

/* ================================================================
   HAMBURGER MENU
   ================================================================ */
const ham      = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

ham?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    ham.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    ham.setAttribute('aria-expanded', open);
});

navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        ham.querySelector('i').className = 'fas fa-bars';
        ham.setAttribute('aria-expanded', 'false');
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (navLinks?.classList.contains('open') && !navLinks.contains(e.target) && !ham.contains(e.target)) {
        navLinks.classList.remove('open');
        ham.querySelector('i').className = 'fas fa-bars';
    }
});

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // navbar height
            const top    = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ================================================================
   TYPING EFFECT
   ================================================================ */
const phrases = ['Full Stack Developer', 'DevOps Engineer', 'Cloud Architect', 'CI/CD Specialist'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    if (!typedEl) return;
    const cur = phrases[pi];
    if (deleting) {
        typedEl.textContent = cur.substring(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 350); return; }
    } else {
        typedEl.textContent = cur.substring(0, ++ci);
        if (ci === cur.length) { deleting = true; setTimeout(type, 2000); return; }
    }
    setTimeout(type, deleting ? 40 : 90);
}
setTimeout(type, 1200);

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
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

/* ================================================================
   ACTIVE NAV — IntersectionObserver (more reliable than scroll)
   ================================================================ */
const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ================================================================
   COUNTERS — trigger once on enter
   ================================================================ */
function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const decimal  = parseInt(el.dataset.decimal) || 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 1600;
    const step     = target / (duration / 16);
    let cur = 0;
    const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = decimal ? cur.toFixed(decimal) + suffix : Math.floor(cur) + suffix;
        if (cur >= target) clearInterval(t);
    }, 16);
}

const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// Hero stats fire on load (already visible)
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero-stats [data-count]').forEach(animateCount);
    }, 900);
});

/* ================================================================
   SKILL BAR ANIMATION
   ================================================================ */
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            setTimeout(() => { e.target.style.width = e.target.dataset.width + '%'; }, 200);
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.bar-fill').forEach(el => barObs.observe(el));

/* ================================================================
   3D CARD TILT — Project cards ONLY (not timeline, not skill cats)
   Projects are the showcase; everything else should be stable.
   ================================================================ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const rotX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -5;
        const rotY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  5;
        card.style.transform  = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
        card.style.transition = 'transform 0.08s linear';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
});

/* ================================================================
   CONTACT FORM — Focus feedback
   ================================================================ */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
    input.addEventListener('blur',  () => input.parentElement?.classList.remove('focused'));
    input.addEventListener('input', () => input.classList.toggle('has-value', input.value.trim().length > 0));
});

/* ================================================================
   PAGE VISIBILITY — Tab title (subtle personal touch)
   ================================================================ */
const origTitle = document.title;
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '👋 Come back!' : origTitle;
});

/* ================================================================
   PIPELINE NODE TOOLTIPS
   ================================================================ */
({
    'PUSH':       'Code pushed to GitHub repository',
    'BUILD':      'Jenkins triggers automated build',
    'IMAGE':      'Docker image built & pushed to registry',
    'PROVISION':  'Terraform provisions AWS infrastructure',
    'CONFIGURE':  'Ansible configures server environment',
    'ORCHESTRATE':'Kubernetes orchestrates containers',
    'LIVE':       '✓ Live on AWS Production',
}).valueOf() && document.querySelectorAll('.ps-node-label').forEach(label => {
    const map = {
        'PUSH':'Code pushed to GitHub repository','BUILD':'Jenkins triggers automated build',
        'IMAGE':'Docker image built & pushed to registry','PROVISION':'Terraform provisions AWS infrastructure',
        'CONFIGURE':'Ansible configures server environment','ORCHESTRATE':'Kubernetes orchestrates containers',
        'LIVE':'✓ Live on AWS Production',
    };
    const node = label.closest('.ps-node');
    if (node && map[label.textContent.trim()]) node.setAttribute('title', map[label.textContent.trim()]);
});

/* ================================================================
   KEYBOARD ACCESSIBILITY — Esc closes mobile menu
   ================================================================ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
        navLinks.classList.remove('open');
        ham.querySelector('i').className = 'fas fa-bars';
        ham.focus();
    }
});