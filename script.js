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

// Handle content samples upload
const contentSamplesInput = document.getElementById('content-samples');
if (contentSamplesInput) {
    contentSamplesInput.addEventListener('change', (e) => {
        const fileLabel = contentSamplesInput.closest('.file-upload-wrapper').querySelector('.file-upload-label');
        const fileNameSpan = fileLabel.querySelector('.file-name');
        
        if (e.target.files.length > 0) {
            const fileCount = e.target.files.length;
            fileNameSpan.textContent = `${fileCount} file${fileCount > 1 ? 's' : ''} selected`;
            fileLabel.style.borderColor = 'var(--of-blue)';
            fileLabel.style.background = 'var(--bright-bg)';
        } else {
            fileNameSpan.textContent = '';
            fileLabel.style.borderColor = 'rgba(0, 175, 240, 0.4)';
            fileLabel.style.background = 'var(--light-bg)';
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
// TOP TESTIMONIALS VIDEO HANDLER
// ========================================

const initTopTestimonials = () => {
    const topVideos = document.querySelectorAll('.top-video-card video');
    
    topVideos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');
        const overlay = wrapper ? wrapper.querySelector('.video-overlay') : null;
        
        // Hide overlay when video plays
        video.addEventListener('play', () => {
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }
        });
        
        // Show overlay when video pauses
        video.addEventListener('pause', () => {
            if (overlay && video.currentTime > 0 && !video.ended) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            }
        });
        
        // Show overlay when video ends
        video.addEventListener('ended', () => {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            }
        });
        
        // Click overlay to play video
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                video.play();
            });
        }
    });
};

// Initialize top testimonials when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopTestimonials);
} else {
    initTopTestimonials();
}

// ========================================
// Other Socials Functionality
// ========================================

const initOtherSocials = () => {
    const addBtn = document.getElementById('addOtherSocialsBtn');
    const container = document.getElementById('otherSocialsContainer');
    let socialCount = 0;
    
    if (!addBtn || !container) return;
    
    addBtn.addEventListener('click', () => {
        socialCount++;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'other-social-input-wrapper';
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(-10px)';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `other-social-${socialCount}`;
        input.placeholder = 'Platform + handle (e.g., Twitter: @username)';
        input.className = 'form-input';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-social-btn';
        removeBtn.innerHTML = '✕';
        removeBtn.addEventListener('click', () => {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(-10px)';
            setTimeout(() => wrapper.remove(), 300);
        });
        
        wrapper.appendChild(input);
        wrapper.appendChild(removeBtn);
        container.appendChild(wrapper);
        
        // Animate in
        setTimeout(() => {
            wrapper.style.transition = 'all 0.3s ease';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0)';
        }, 10);
    });
};

// Initialize other socials functionality
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOtherSocials);
} else {
    initOtherSocials();
}

// ========================================
// Video Testimonials Functionality
// ========================================

const initVideoTestimonials = () => {
    const videos = document.querySelectorAll('.video-wrapper video');
    
    videos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');
        const overlay = wrapper.querySelector('.video-overlay');
        
        // Hide overlay when video plays
        video.addEventListener('play', () => {
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        // Show overlay when video pauses
        video.addEventListener('pause', () => {
            if (overlay && video.currentTime === 0) {
                overlay.style.opacity = '1';
            }
        });
        
        // Show overlay when video ends
        video.addEventListener('ended', () => {
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Click overlay to play video
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                video.play();
            });
        }
    });
};

// Initialize video testimonials
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoTestimonials);
} else {
    initVideoTestimonials();
}

// Scroll-triggered fade effects for Solution section
function initScrollFadeEffects() {
    const scrollElements = document.querySelectorAll('.scroll-fade, .colorful-divider');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check
    handleScrollAnimation();
}

// Initialize scroll fade effects
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollFadeEffects);
} else {
    initScrollFadeEffects();
}

