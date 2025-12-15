document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.bookInfoButton');
    const bookDetails = document.getElementById('bookDetails');
    const authorDetails = document.getElementById('authorDetails');
    const orderInfo = document.getElementById('orderInfo');

    // Function to initialize mobile view
    function initMobileView() {
        if (window.innerWidth <= 478) {
            // Find which button is active
            const activeButton = document.querySelector('.bookInfoButton.active');
            const targetId = activeButton ? activeButton.getAttribute('data-target') : 'bookDetails';

            // Hide all sections first
            if (bookDetails) bookDetails.classList.remove('active');
            if (authorDetails) authorDetails.classList.remove('active');
            if (orderInfo) orderInfo.classList.remove('active');

            // Show the active section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        } else {
            // On desktop, show all sections
            if (bookDetails) bookDetails.classList.add('active');
            if (authorDetails) authorDetails.classList.add('active');
            if (orderInfo) orderInfo.classList.add('active');
        }
    }

    // Add click handlers to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            // Remove active from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active to clicked button
            this.classList.add('active');

            // Hide all sections
            if (bookDetails) bookDetails.classList.remove('active');
            if (authorDetails) authorDetails.classList.remove('active');
            if (orderInfo) orderInfo.classList.remove('active');

            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Initialize on page load
    initMobileView();

    // Re-initialize on window resize
    window.addEventListener('resize', initMobileView);
});
