/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 560) scrollTop.classList.add('show'); 
    else scrollTop.classList.remove('show');
}
window.addEventListener('scroll', scrollTop);

/*===== SCROLL TO TOP =====*/
const scrollTopBtn = document.getElementById('scroll-top');
if(scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*===== FAQ ACCORDION =====*/
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
    const faqQuestion = item.querySelector('.faq__question');
    
    faqQuestion.addEventListener('click', () => {
        const openItem = document.querySelector('.faq__item.active');
        
        toggleItem(item);
        
        if(openItem && openItem !== item) {
            toggleItem(openItem);
        }
    });
});

const toggleItem = (item) => {
    const faqAnswer = item.querySelector('.faq__answer');
    
    if(item.classList.contains('active')) {
        faqAnswer.removeAttribute('style');
        item.classList.remove('active');
    } else {
        faqAnswer.style.height = faqAnswer.scrollHeight + 'px';
        item.classList.add('active');
    }
};

/*===== TESTIMONIALS SWIPER =====*/
let testimonialsSwiper = new Swiper('.testimonials__container', {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 48,
        },
    },
});

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Validate form
        if(!name || !email || !service || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        if(!isValidEmail(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.contact__btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone || 'غير محدد',
            service: getServiceName(service),
            message: message,
            to_email: 'your.email@example.com' // Replace with your email
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                showNotification('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

/*===== NEWSLETTER FORM =====*/
const newsletterForm = document.querySelector('.footer__newsletter-form');

if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.footer__newsletter-input');
        const email = emailInput.value.trim();
        
        if(!email) {
            showNotification('يرجى إدخال بريدك الإلكتروني', 'error');
            return;
        }
        
        if(!isValidEmail(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Here you can integrate with your newsletter service
        showNotification('تم الاشتراك بنجاح في النشرة الإخبارية!', 'success');
        emailInput.value = '';
    });
}

/*===== UTILITY FUNCTIONS =====*/
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getServiceName(serviceValue) {
    const services = {
        'writing': 'الكتابة الاحترافية',
        'office': 'خبرة مايكروسوفت أوفيس',
        'seo': 'كتابة محتوى SEO',
        'adsense': 'تحقيق الدخل من Google AdSense',
        'social': 'إدارة صفحات التواصل الاجتماعي',
        'cv': 'كتابة السيرة الذاتية',
        'other': 'خدمة أخرى'
    };
    return services[serviceValue] || serviceValue;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        .notification__close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        .notification__close:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if(notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/*===== SMOOTH SCROLLING FOR ANCHOR LINKS =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== LAZY LOADING FOR IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollTop);

window.addEventListener('scroll', debounce(scrollActive, 10));
window.addEventListener('scroll', debounce(scrollHeader, 10));
window.addEventListener('scroll', debounce(scrollTop, 10));

/*===== INITIALIZE AOS ANIMATIONS =====*/
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
});

/*===== PRELOADER =====*/
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

/*===== KEYBOARD NAVIGATION =====*/
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if(e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if(navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
    
    // Enter key for FAQ items
    if(e.key === 'Enter' && e.target.classList.contains('faq__question')) {
        e.target.click();
    }
});

/*===== FORM VALIDATION HELPERS =====*/
function addInputValidation() {
    const inputs = document.querySelectorAll('.contact__input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearInputError(this);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');
    
    clearInputError(input);
    
    if(required && !value) {
        showInputError(input, 'هذا الحقل مطلوب');
        return false;
    }
    
    if(type === 'email' && value && !isValidEmail(value)) {
        showInputError(input, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if(type === 'tel' && value && !/^[\+]?[0-9\s\-\(\)]+$/.test(value)) {
        showInputError(input, 'يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

function showInputError(input, message) {
    input.style.borderColor = '#ef4444';
    
    let errorElement = input.parentNode.querySelector('.input-error');
    if(!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'input-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearInputError(input) {
    input.style.borderColor = '';
    const errorElement = input.parentNode.querySelector('.input-error');
    if(errorElement) {
        errorElement.remove();
    }
}

// Initialize input validation
document.addEventListener('DOMContentLoaded', addInputValidation);

/*===== ANALYTICS AND TRACKING =====*/
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if(typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
if(contactForm) {
    contactForm.addEventListener('submit', function() {
        trackEvent('form_submit', {
            form_name: 'contact_form'
        });
    });
}

// Track button clicks
document.querySelectorAll('.btn, .service__btn, .pricing__btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent.trim(),
            button_location: this.closest('section')?.id || 'unknown'
        });
    });
});

/*===== ACCESSIBILITY IMPROVEMENTS =====*/
// Skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add skip link
document.addEventListener('DOMContentLoaded', addSkipLink);

// Announce page changes to screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can send error reports to your analytics service here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can send error reports to your analytics service here
});

/*===== BROWSER COMPATIBILITY =====*/
// Polyfill for IntersectionObserver
if(!window.IntersectionObserver) {
    // Fallback for older browsers
    images.forEach(img => {
        if(img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// Polyfill for smooth scrolling
if(!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                // Smooth scroll polyfill
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if(start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if(timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if(t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

