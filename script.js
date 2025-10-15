// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Enhanced typing animation
const typingText = document.getElementById('typing-text');
const texts = ['Full Stack Developer', 'Problem Solver', 'Creative Thinker', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typingText) return; // guard
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeWriter, isDeleting ? 50 : 120);
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(() => {
                    document.querySelectorAll('.skill-bar').forEach((bar, index) => {
                        setTimeout(() => {
                            bar.classList.add('animate');
                        }, index * 200);
                    });
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) observer.observe(skillsSection);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        // set ARIA attributes
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');

        function openMobileMenu() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            // move focus into menu
            const firstLink = mobileMenu.querySelector('.mobile-nav-link');
            if (firstLink) firstLink.focus();
        }

        function closeMobileMenu() {
            mobileMenu.classList.add('hidden');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) openMobileMenu(); else closeMobileMenu();
        });

        // Close if any mobile link is clicked
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!mobileMenu.classList.contains('hidden')) closeMobileMenu();
            }
        });
    }
}

// Enhanced navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    updateScrollProgress();

    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/90');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.add('bg-white/80');
            navbar.classList.remove('bg-white/90');
        }
    }
});

// Enhanced contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
            // Animate button
            submitBtn.innerHTML = '✨ Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('animate-pulse');

            setTimeout(() => {
                submitBtn.innerHTML = '🎉 Message Sent!';
                submitBtn.classList.remove('animate-pulse');

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                    alert(`Thank you, ${name}! Your message about "${subject}" has been sent successfully. I'll get back to you at ${email} soon! 🚀`);
                }, 2000);
            }, 1500);
        }
    });
}

// Project and social media functions
function openSocial(platform) {
    const links = {
        linkedin: 'https://www.linkedin.com/in/pranav-davang-006429332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://github.com/Pranav2664?tab=repositories',
        // twitter: 'https://twitter.com/YOUR_TWITTER_USERNAME'
    };

    if (links[platform]) {
        window.open(links[platform], '_blank'); // Opens link in a new tab
    } else {
        alert('Platform link not found!');
    }
}

// Handle project buttons (Live Demo / GitHub)
function openProject(kind) {
    // You can replace these alerts with window.open(url, '_blank') when links are available
    if (kind === 'demo') {
        alert('Live demo would open here! 🚀');
    } else if (kind === 'github') {
        alert('GitHub repository would open here! 💻');
    } else {
        alert('Project action not recognized.');
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    updateScrollProgress();

    // Start typing animation
    typeWriter();

    // Add some interactive hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
