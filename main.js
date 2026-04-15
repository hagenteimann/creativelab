/**
 * creativelab.de - Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initPageFade();
    initSmoothScroll();
    initProgressBar();
    initCustomCursor();
    initScrollReveal();
    initCounters();
    initScrollSpy();
    initNavEffects();
    initMobileMenu();
    initTabs();
    initContactForm();
    initSparks();
    initSoundToggle();
});

// ── PAGE LOAD FADE IN
function initPageFade() {
    if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
    } else {
        window.addEventListener('load', () => document.body.classList.add('loaded'));
    }
}

// ── SMOOTH SCROLLING
function initSmoothScroll() {
    const navHeight = document.getElementById('nav')?.offsetHeight || 70;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            
            e.preventDefault();
            const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
            
            history.pushState(null, '', '#' + id);
        });
    });
}

// ── PROGRESS BAR
function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
}

// ── CUSTOM CURSOR
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    if (window.matchMedia('(hover:hover)').matches) {
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.classList.add('visible');
            ring.classList.add('visible');
        });

        const interactives = 'a, button, .port-slot, .tab-btn, .price-card, .testi-card, .uc-card, .work-card';
        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });

        const animate = () => {
            if (!document.hidden) {
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
                
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// ── SCROLL REVEAL (Intersection Observer)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const el = entry.target;
            const target = +el.dataset.count;
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const increment = target / 50;
            
            const update = () => {
                current = Math.min(current + increment, target);
                el.textContent = Math.floor(current) + suffix;
                if (current < target) requestAnimationFrame(update);
            };
            
            update();
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num[data-count]').forEach(el => observer.observe(el));
}

// ── SCROLL SPY
function initScrollSpy() {
    const sections = ['hero', 'about', 'portfolio', 'services', 'use-cases', 'social-proof', 'pricing', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

// ── NAV EFFECTS (Scrolled class toggle)
function initNavEffects() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

// ── MOBILE MENU
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!burger || !mobileMenu) return;

    const toggleMenu = () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── SERVICES TABS
function initTabs() {
    const tabData = {
        social: {
            title: 'Social Media Management',
            items: [
                'Strategie, Planung & tägliche Produktion',
                'Reels, Stories, TikToks — plattformnativ',
                'Community Management & datenbasiertes Wachstum'
            ]
        },
        video: {
            title: 'Video Editing',
            items: [
                'Cinematic Reels & Produktionsschnitte',
                'Color Grading, Motion Graphics & Sound Design',
                'Schnelle Turnarounds für Social-First-Formate'
            ]
        },
        ki: {
            title: 'KI-Content',
            items: [
                'AI-gestütztes Scripting & Textoptimierung',
                'KI-Bildgenerierung & visuelle Konzepte',
                'Automatisierte Content-Workflows'
            ]
        },
        strategie: {
            title: 'Content-Strategie',
            items: [
                'Plattform-Analyse & Zielgruppen-Research',
                'Redaktionsplan & Content-Kalender',
                'KPI-Tracking & Strategie-Calls'
            ]
        }
    };

    const tabButtons = document.querySelectorAll('.tab-btn');
    const svcTitle = document.getElementById('svc-title');
    const svcDetail = document.getElementById('svc-detail');
    const tabImages = document.querySelectorAll('[data-tab-img]');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabKey = btn.dataset.tab;
            const data = tabData[tabKey];
            if (!data) return;

            // Updates active state
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update images
            tabImages.forEach(img => img.classList.toggle('hidden', img.dataset.tabImg !== tabKey));

            // Update text content with fade animation
            svcDetail.classList.remove('tab-animating');
            void svcDetail.offsetWidth; // reflow to restart animation
            svcTitle.textContent = data.title;
            svcDetail.querySelectorAll('p').forEach(p => p.remove());
            data.items.forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = item;
                svcDetail.appendChild(p);
            });
            svcDetail.classList.add('tab-animating');
        });
    });
}

// ── CONTACT FORM
function initContactForm() {
    const FORMSPREE_ID = 'DEINE_FORM_ID'; // Placeholder
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';

        try {
            const formData = new FormData(form);
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                form.innerHTML = `
                    <div class="form-success-state">
                        <svg width="64" height="64" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" stroke="var(--g500)" stroke-width="2" fill="none" opacity=".3"/>
                            <path d="M20 32 l9 9 l15-18" stroke="var(--g400)" stroke-width="2.5" fill="none"
                                stroke-linecap="round" stroke-linejoin="round"
                                stroke-dasharray="50" stroke-dashoffset="50"
                                style="animation:checkDraw .5s .3s ease forwards"/>
                        </svg>
                        <p class="success-title">Nachricht gesendet!</p>
                        <span class="success-sub">Ich melde mich in der Regel innerhalb von 24 Stunden.<br>Bis bald.</span>
                    </div>`;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Nachricht senden';
            alert('Fehler beim Senden. Bitte versuche es erneut.');
        }
    });
}

// ── SPARKS (Particle System)
function initSparks() {
    const canvas = document.getElementById('sparks');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let isPaused = false;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => isPaused = document.hidden);

    const spawn = () => {
        const depth = Math.random();
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            radius: 0.8 + depth * 2.2,
            velocity: -(0.15 + depth * 0.25),
            alpha: 0.06 + depth * 0.35
        });
        if (particles.length > 60) particles.shift();
    };

    setInterval(() => { if (!isPaused) spawn(); }, 600);

    const draw = () => {
        if (!isPaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p => p.alpha > 0 && p.y > -10);
            
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha.toFixed(3)})`;
                ctx.fill();
                p.y += p.velocity;
                p.alpha -= 0.0005;
            });
        }
        requestAnimationFrame(draw);
    };
    draw();
}

// ── SOUND TOGGLE & VIEWPORT VIDEO SOUND
function initSoundToggle() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;

    const iconMuted = btn.querySelector('.icon-muted');
    const iconUnmuted = btn.querySelector('.icon-unmuted');
    let soundEnabled = false;

    // Toggle mute state
    btn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        btn.classList.toggle('active', soundEnabled);
        iconMuted.style.display = soundEnabled ? 'none' : 'block';
        iconUnmuted.style.display = soundEnabled ? 'block' : 'none';

        // Apply to all videos immediately
        document.querySelectorAll('video').forEach(v => {
            v.muted = !soundEnabled;
            if (!soundEnabled) v.muted = true;
        });
    });

    // Observe all videos: unmute when in viewport, mute when out
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting && soundEnabled) {
                video.muted = false;
                video.play().catch(() => {});
            } else {
                video.muted = true;
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(v => observer.observe(v));
}
