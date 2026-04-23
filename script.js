/* ---- Preloader ---- */
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hide');
            }, 500);
        });

        /* ---- Scroll Progress ---- */
        window.addEventListener('scroll', () => {
            const h = document.documentElement;
            const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
            document.getElementById('progress-bar').style.width = pct + '%';

            /* Navbar */
            document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);

            /* Back to top */
            document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);

            /* Active nav link */
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 200) current = s.id;
            });
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + current);
            });
        });



        /* ---- Hamburger ---- */
        const ham = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        ham.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = ham.querySelector('i');
            icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                ham.querySelector('i').className = 'fas fa-bars';
            });
        });

        /* ---- Smooth Scroll ---- */
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
            });
        });

        /* ---- Typing Effect ---- */
        const phrases = ['Full Stack Developer', 'DevOps Engineer', 'Cloud Computing Expert', 'CI/CD Architect'];
        let pi = 0, ci = 0, del = false;
        const typed = document.getElementById('typedText');
        function type() {
            const cur = phrases[pi];
            if (del) {
                typed.textContent = cur.substring(0, --ci);
                if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
            } else {
                typed.textContent = cur.substring(0, ++ci);
                if (ci === cur.length) { del = true; setTimeout(type, 2200); return; }
            }
            setTimeout(type, del ? 45 : 95);
        }
        setTimeout(type, 1200);

        /* ---- Counter Animations ---- */
        function animateCount(el) {
            const target = parseFloat(el.dataset.count);
            const decimal = parseInt(el.dataset.decimal) || 0;
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = decimal ? current.toFixed(decimal) + suffix : Math.floor(current) + suffix;
                if (current >= target) clearInterval(timer);
            }, 16);
        }

        /* ---- Intersection Observer (Reveal + Count + Bar) ---- */
        const revealObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

        /* Count Observer */
        const countObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

        /* Bar Observer */
        const barObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const w = entry.target.dataset.width;
                    setTimeout(() => { entry.target.style.width = w + '%'; }, 200);
                    barObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.bar-fill').forEach(el => barObs.observe(el));


    
        /* ============================================================
           ADVANCED MICRO-INTERACTIONS (TOP 1%)
        ============================================================ */

        /* 1. 3D Tilt Effect for Glass Cards */
        const tiltCards = document.querySelectorAll('.project-card, .service-card, .exp-item, .skill-cat');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on cursor position (-5deg to +5deg)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease';
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
                card.style.zIndex = '1';
            });
        });

        /* 2. Magnetic Buttons */
        const magneticBtns = document.querySelectorAll('.btn-main, .btn-ghost, .btn-resume, .hero-socials a');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                btn.style.transition = 'transform 0.1s ease';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });

        /* 3. Page Visibility Easter Egg */
        let originalTitle = document.title;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.title = "Come back soon! 🚀";
            } else {
                document.title = originalTitle;
            }
        });

    
        /* ============================================================
           UNIVERSAL TEXT SCRAMBLE EFFECT
        ============================================================ */
        class TextScramble {
            constructor(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.update = this.update.bind(this);
            }
            setText(newText) {
                const oldText = this.el.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise((resolve) => this.resolve = resolve);
                this.queue = [];
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 40);
                    const end = start + Math.floor(Math.random() * 40);
                    this.queue.push({ from, to, start, end });
                }
                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            }
            update() {
                let output = '';
                let complete = 0;
                for (let i = 0, n = this.queue.length; i < n; i++) {
                    let { from, to, start, end, char } = this.queue[i];
                    if (this.frame >= end) {
                        complete++;
                        output += to;
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar();
                            this.queue[i].char = char;
                        }
                        output += `<span style="opacity: 0.5; color: var(--primary)">${char}</span>`;
                    } else {
                        output += from;
                    }
                }
                this.el.innerHTML = output;
                if (complete === this.queue.length) {
                    this.resolve();
                } else {
                    this.frameRequest = requestAnimationFrame(this.update);
                    this.frame++;
                }
            }
            randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        }

        // Apply scramble to all section titles when they scroll into view
        const titles = document.querySelectorAll('.section-title');
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.scrambled) {
                    entry.target.dataset.scrambled = "true";
                    const originalText = entry.target.innerText;
                    entry.target.innerText = '';
                    const fx = new TextScramble(entry.target);
                    setTimeout(() => {
                        fx.setText(originalText);
                    }, 200); // slight delay after reveal
                }
            });
        }, { threshold: 0.5 });

        titles.forEach(title => {
            // Save original text in dataset to prevent double-scrambling issues
            titleObserver.observe(title);
        });