// ========================================
// SCROLL ANIMATIONS
// ========================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link, .cta-button-header');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// BENEFIT CARDS ANIMATION
// ========================================

// Benefit cards now use static icons and text
// No counter animation needed - just hover effects via CSS

// ========================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// CURSOR GLOW EFFECT
// ========================================

const createCursorGlow = () => {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 175, 240, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    const animateCursor = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        cursorGlow.style.left = `${currentX - 200}px`;
        cursorGlow.style.top = `${currentY - 200}px`;
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
};

// Only enable cursor glow on desktop
if (window.innerWidth > 768) {
    createCursorGlow();
}

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = this.querySelector('.button-glow');
        if (ripple) {
            ripple.style.width = '0';
            ripple.style.height = '0';
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
            }, 10);
        }
    });
});

// ========================================
// CARD TILT EFFECT
// ========================================

const addTiltEffect = () => {
    const cards = document.querySelectorAll('.challenge-card, .offer-card, .requirements-column');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
};

// Enable tilt effect on desktop
if (window.innerWidth > 768) {
    addTiltEffect();
}

// ========================================
// FILE UPLOAD HANDLER
// ========================================

const fileInput = document.getElementById('revenue-proof');
const fileLabel = document.querySelector('.file-upload-label');
const fileName = document.querySelector('.file-name');

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            fileName.textContent = file.name;
            fileLabel.style.borderColor = 'var(--of-blue)';
        } else {
            fileName.textContent = '';
            fileLabel.style.borderColor = 'rgba(0, 175, 240, 0.3)';
        }
    });
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(applicationForm);
        const whatsapp = formData.get('whatsapp');
        const tiktok = formData.get('tiktok');
        const instagram = formData.get('instagram');
        const onlyfans = formData.get('onlyfans');
        const country = formData.get('country');
        const additionalInfo = formData.get('additional-info');
        const revenueProof = formData.get('revenue-proof');
        
        // Basic validation
        if (!whatsapp || !tiktok || !instagram || !onlyfans || !country || !revenueProof || revenueProof.size === 0) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate WhatsApp number format
        const whatsappRegex = /^\+?[1-9]\d{1,14}$/;
        if (!whatsappRegex.test(whatsapp.replace(/\s/g, ''))) {
            showNotification('Please enter a valid WhatsApp number with country code', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = applicationForm.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('span').textContent;
        submitButton.querySelector('span').textContent = 'Submitting...';
        submitButton.disabled = true;
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Application submitted successfully! We will contact you within 24 hours via WhatsApp.', 'success');
            
            // Reset form
            applicationForm.reset();
            fileName.textContent = '';
            
            // Log data for testing (remove in production)
            console.log('Application Data:', {
                whatsapp,
                tiktok,
                instagram,
                onlyfans,
                country,
                additionalInfo
            });
            
        } catch (error) {
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        padding: 20px 28px;
        background: ${type === 'success' ? 'rgba(0, 175, 240, 0.95)' : 'rgba(255, 50, 50, 0.95)'};
        color: white;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease, fadeOut 0.4s ease 4.6s forwards;
        max-width: 400px;
        backdrop-filter: blur(20px);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
};

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-1);
        width: 0%;
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 20px rgba(0, 175, 240, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

createScrollProgress();

// ========================================
// LAZY LOAD IMAGES
// ========================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for intensive operations
const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

const activateEasterEgg = () => {
    document.body.style.animation = 'rainbow 3s infinite';
    showNotification('🎉 You found the secret! Welcome to the LuxLife VIP experience!', 'success');
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
};

// ========================================
// INITIALIZE ON LOAD
// ========================================

window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Log welcome message
    console.log('%c🎉 Welcome to LuxLife Agency! 🎉', 'color: #00AFF0; font-size: 20px; font-weight: bold;');
    console.log('%cWe\'re excited to potentially partner with you!', 'color: #94A3B8; font-size: 14px;');
});

// ========================================
// RESPONSIVE UTILITIES
// ========================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    
    // Re-initialize effects if switching between mobile/desktop
    if ((windowWidth <= 768 && newWidth > 768) || (windowWidth > 768 && newWidth <= 768)) {
        location.reload();
    }
    
    windowWidth = newWidth;
}, 250));

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Keyboard navigation for cards
document.querySelectorAll('.challenge-card, .offer-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid var(--of-blue);
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// ========================================
// ANALYTICS & TRACKING (Placeholder)
// ========================================

const trackEvent = (category, action, label) => {
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
};

// Track CTA clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA', 'click', button.textContent.trim());
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id || entry.target.className;
            trackEvent('Section View', 'view', sectionId);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// CONSOLE ASCII ART
// ========================================

console.log(`
%c
██╗     ██╗   ██╗██╗  ██╗██╗     ██╗███████╗███████╗
██║     ██║   ██║╚██╗██╔╝██║     ██║██╔════╝██╔════╝
██║     ██║   ██║ ╚███╔╝ ██║     ██║█████╗  █████╗  
██║     ██║   ██║ ██╔██╗ ██║     ██║██╔══╝  ██╔══╝  
███████╗╚██████╔╝██╔╝ ██╗███████╗██║██║     ███████╗
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝     ╚══════╝

Professional OnlyFans Management | 50/50 Partnership
`, 'color: #00AFF0; font-weight: bold;');

console.log('%cInterested in working with us? Apply at the bottom of the page!', 'color: #94A3B8; font-size: 12px;');

// ========================================
// TESTIMONIAL CAROUSEL
// ========================================

const testimonialCarousel = () => {
    const carousel = document.getElementById('testimonialCarousel');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    let currentSlide = 0;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Show specific slide
    const showSlide = (index) => {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'slide-out-left', 'slide-out-right');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    };
    
    // Next slide
    const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('slide-out-left');
        setTimeout(() => {
            showSlide(nextIndex);
        }, 300);
    };
    
    // Previous slide
    const prevSlide = () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('slide-out-right');
        setTimeout(() => {
            showSlide(prevIndex);
        }, 300);
    };
    
    // Auto play
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    };
    
    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };
    
    // Button click handlers
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            if (index > currentSlide) {
                slides[currentSlide].classList.add('slide-out-left');
            } else if (index < currentSlide) {
                slides[currentSlide].classList.add('slide-out-right');
            }
            setTimeout(() => {
                showSlide(index);
            }, 300);
            startAutoPlay();
        });
    });
    
    // Touch/swipe handlers for mobile
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Mouse drag handlers for desktop
        let isDragging = false;
        let dragStartX = 0;
        
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            carousel.style.cursor = 'grabbing';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
        });
        
        carousel.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carousel.style.cursor = 'grab';
            
            const dragEndX = e.clientX;
            const diff = dragStartX - dragEndX;
            
            if (Math.abs(diff) > 50) {
                stopAutoPlay();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoPlay();
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.style.cursor = 'grab';
    }
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoPlay();
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            startAutoPlay();
        }
    };
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // Pause on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start auto play
    startAutoPlay();
};

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testimonialCarousel);
} else {
    testimonialCarousel();
}

