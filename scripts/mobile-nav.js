/**
 * Mobile Navigation Menu Toggle
 * Toggles the mobile navigation menu and switches between hamburger and X icon
 */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    // Exit if elements don't exist
    if (!mobileMenuToggle || !mobileNav) return;

    const menuIcon = mobileMenuToggle.querySelector('i');

    // Function to open the mobile menu
    function openMenu() {
        mobileNav.classList.add('active');
        menuIcon.className = 'iconoir-xmark';
    }

    // Function to close the mobile menu
    function closeMenu() {
        mobileNav.classList.remove('active');
        menuIcon.className = 'iconoir-menu';
    }

    // Toggle mobile navigation menu when clicking hamburger/X button
    mobileMenuToggle.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobileNavLink');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mobileNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
});
