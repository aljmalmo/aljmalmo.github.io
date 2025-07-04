document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile Menu Toggle (Hamburger Icon)
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
            // Close all dropdowns when main menu is toggled
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Dropdown Menu Toggle (for mobile/touch devices & Desktop Hover)
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            // For Desktop Hover
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) { // Only on desktop
                    dropdown.classList.add('active');
                }
            });
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) { // Only on desktop
                    dropdown.classList.remove('active');
                }
            });

            // For Mobile Click
            dropbtn.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) { // Only on mobile
                    e.preventDefault(); // Prevent default link behavior
                    dropdown.classList.toggle('active');
                    // Close other dropdowns if open
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close mobile menu when a link is clicked (for smoother UX)
    navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && mobileMenu) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking an anchor link
            if (navLinks.classList.contains('active') && mobileMenu) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        });
    });

    // --- Scroll-based Animations (Intersection Observer) ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element is visible to trigger animation
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay ? parseFloat(entry.target.dataset.delay) * 1000 : 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});
