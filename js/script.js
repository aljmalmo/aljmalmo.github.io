document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll'); // Prevent body scroll
    });

    closeMenu.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    overlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Close menu when a link in the mobile nav is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = link.getAttribute('href');
            // Close menu if it's an internal anchor or an internal HTML page
            if (href && (href.startsWith('#') || (!href.startsWith('http') && href.endsWith('.html')))) { 
                // Small delay to allow scroll to complete before closing menu for smoother UX
                setTimeout(() => {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }, 300); // Adjust delay as needed
            }
            // If it's an external link, let the browser handle it without closing the menu immediately
        });
    });
});