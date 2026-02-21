document.addEventListener('DOMContentLoaded', () => {
    // Stat Counters Animation
    const stats = document.querySelectorAll('.stat-value[data-target]');

    const animateCount = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const count = 0;
        const duration = 2000; // ms
        const startTime = Date.now();

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutExpo)
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            let current = ease * target;

            if (target % 1 === 0) {
                element.innerText = Math.floor(current).toLocaleString();
            } else {
                element.innerText = current.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    // Intersection Observer for stats
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(s => observer.observe(s));

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 7, 10, 0.95)';
            nav.style.padding = '1rem 10%';
        } else {
            nav.style.background = 'rgba(11, 14, 17, 0.8)';
            nav.style.padding = '1.5rem 10%';
        }
    });

    // Reveal animations on scroll
    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s ease-out';
        revealObserver.observe(section);
    });

    // Initialize Components
    initDrawer();
    initAuth();
});

function initAuth() {
    const authNav = document.getElementById('authNav');
    if (!authNav) return;

    const isAuthenticated = localStorage.getItem('user_authenticated');
    const userName = localStorage.getItem('user_name');
    const userEmail = localStorage.getItem('user_email');
    const activePlan = localStorage.getItem('active_plan') || 'Free Trial';

    if (isAuthenticated === 'true') {
        const avatarUrl = `https://ui-avatars.com/api/?name=${userName}&background=00f2ff&color=000&bold=true&rounded=true`;

        authNav.innerHTML = `
            <div class="user-profile-nav" id="profileToggle">
                <img src="${avatarUrl}" alt="Profile" class="user-avatar">
                <div class="user-info-brief">
                    <span class="user-name-label">${userName}</span>
                </div>
                
                <div class="profile-dropdown" id="profileDropdown">
                    <div class="dropdown-header">
                        <div style="font-weight: 700; color: #fff;">${userName}</div>
                        <div style="font-size: 0.75rem; color: var(--text-dim);">${userEmail}</div>
                        <span class="status-badge">${activePlan}</span>
                    </div>
                    
                    <a href="dashboard.html" class="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        My Dashboard
                    </a>
                    <a href="link-broker.html" class="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                        Account Settings
                    </a>
                    <a href="packages.html" class="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        Upgrade Plan
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="contact.html" class="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        Support Center
                    </a>
                    <button onclick="logout()" class="dropdown-item logout" style="width: 100%; background: none; border: none; cursor: pointer; text-align: left;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout System
                    </button>
                </div>
            </div>
        `;

        const toggle = document.getElementById('profileToggle');
        const dropdown = document.getElementById('profileDropdown');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    }
}

function logout() {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('trading_linked');
    window.location.href = 'index.html';
}

function initDrawer() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // 1. Add Toggle Button to Navigation (if not already present)
    if (document.getElementById('openDrawer')) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'menu-toggle';
    toggleBtn.id = 'openDrawer';
    toggleBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    nav.prepend(toggleBtn);

    // 2. Inject Drawer HTML
    const drawerHTML = `
        <div class="drawer-overlay" id="drawerOverlay"></div>
        <div class="side-drawer" id="sideDrawer">
            <div class="drawer-header">
                <a href="index.html" class="drawer-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                    TRADING PRO 0.2
                </a>
                <button class="drawer-close" id="closeDrawer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="drawer-links">
                <a href="index.html" class="drawer-link ${window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html') ? 'active' : ''}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home
                </a>
                <a href="about.html" class="drawer-link ${window.location.pathname.includes('about.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                   About Us
                </a>
                <a href="packages.html" class="drawer-link ${window.location.pathname.includes('packages.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                   Packages
                </a>
                <a href="ai-chat.html" class="drawer-link ${window.location.pathname.includes('ai-chat.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                   AI Chatbot
                </a>
                <a href="dashboard.html" class="drawer-link ${window.location.pathname.includes('dashboard.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                   My Dashboard
                </a>
                <a href="link-broker.html" class="drawer-link ${window.location.pathname.includes('link-broker.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                   Link Broker
                </a>
                <a href="contact.html" class="drawer-link ${window.location.pathname.includes('contact.html') ? 'active' : ''}">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                   Contact
                </a>
            </div>
            <div class="drawer-footer">
                <div class="drawer-footer-card">
                    <p>Trading Pro 0.2.4</p>
                    <div style="font-size: 0.6rem; color: var(--text-dim); margin-top: 0.3rem;">Secure AI Node &copy; 2026</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawerHTML);

    // 3. Toggle Logic
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const openBtn = document.getElementById('openDrawer');
    const closeBtn = document.getElementById('closeDrawer');

    if (openBtn && drawer && overlay && closeBtn) {
        const toggleDrawer = () => {
            drawer.classList.toggle('open');
            overlay.classList.toggle('show');
            document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        };

        openBtn.addEventListener('click', toggleDrawer);
        closeBtn.addEventListener('click', toggleDrawer);
        overlay.addEventListener('click', toggleDrawer);

        // Close on link click
        document.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', () => {
                if (drawer.classList.contains('open')) toggleDrawer();
            });
        });
    }
}
