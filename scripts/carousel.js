// Helper function to determine books per screen based on viewport width
function getBooksPerScreen() {
    if (window.innerWidth <= 478) {
        return 2; // Mobile
    } else if (window.innerWidth <= 759) {
        return 3; // Medium
    } else {
        return 5; // Desktop
    }
}

// Helper function for smaller carousels (staff picks) - shows fewer books
function getBooksPerScreenSmaller() {
    if (window.innerWidth <= 478) {
        return 2; // Mobile - 2 books
    } else if (window.innerWidth <= 759) {
        return 3; // Medium - 3 books
    } else {
        return 5; // Desktop - 5 books (same as regular)
    }
}

// Calculate total sections needed based on total books and books per screen
function calculateTotalSections(totalBooks, booksPerScreen) {
    return Math.ceil(totalBooks / booksPerScreen);
}

// Carousel functionality - supports multiple carousels on the same page
function initCarousel(carouselSection) {
    let currentSection = 1;

    // Get DOM elements within this specific carousel section
    const arrows = carouselSection.querySelectorAll('.carouselArrow');
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];
    const allBooks = carouselSection.querySelectorAll('.bookCard[data-section]');

    // Calculate dynamic values based on screen size
    const booksPerScreen = getBooksPerScreen();
    const totalBooks = allBooks.length;
    const totalSections = calculateTotalSections(totalBooks, booksPerScreen);

    // Create responsive book mapping (bookIndex → responsiveSection)
    const responsiveBookMapping = {};
    allBooks.forEach((book, index) => {
        const responsiveSection = Math.floor(index / booksPerScreen) + 1;
        responsiveBookMapping[index] = responsiveSection;
    });

    // Function to create dots dynamically based on totalSections
    function createDots() {
        const dotsContainer = carouselSection.querySelector('.carouselDots');
        // Clear existing dots
        dotsContainer.innerHTML = '';

        // Create new dots based on totalSections
        for (let i = 0; i < totalSections; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carouselDot');
            dot.setAttribute('data-section', i + 1);

            // Add click event listener
            dot.addEventListener('click', () => {
                currentSection = i + 1;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }
    }

    // Function to update carousel state
    function updateCarousel() {
        // Get current dots (they may have been recreated)
        const currentDots = carouselSection.querySelectorAll('.carouselDot');

        // Update dots active state
        currentDots.forEach((dot, index) => {
            if (index === currentSection - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update arrow buttons
        leftArrow.disabled = (currentSection === 1);
        rightArrow.disabled = (currentSection === totalSections);

        // Update which books are displayed based on responsive sections
        allBooks.forEach((book, index) => {
            const bookResponsiveSection = responsiveBookMapping[index];
            book.style.display = (bookResponsiveSection === currentSection) ? 'block' : 'none';
        });
    }

    // Event listeners for arrow buttons
    leftArrow.addEventListener('click', () => {
        if (currentSection > 1) {
            currentSection--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentSection < totalSections) {
            currentSection++;
            updateCarousel();
        }
    });

    // Create dots and initialize carousel
    createDots();
    updateCarousel();
}

// Staff Picks Carousel functionality - for staff picks page
// Uses the same class names as regular carousels but wrapped in .smallerCarousel
function initStaffPicksCarousel(carouselSection) {
    let currentSection = 1;

    // Get DOM elements within this specific carousel section
    const arrows = carouselSection.querySelectorAll('.carouselArrow');
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];
    const allBooks = carouselSection.querySelectorAll('.bookCard[data-section]');

    // Calculate dynamic values based on screen size (use smaller carousel function)
    const booksPerScreen = getBooksPerScreenSmaller();
    const totalBooks = allBooks.length;
    const totalSections = calculateTotalSections(totalBooks, booksPerScreen);

    // Create responsive book mapping (bookIndex → responsiveSection)
    const responsiveBookMapping = {};
    allBooks.forEach((book, index) => {
        const responsiveSection = Math.floor(index / booksPerScreen) + 1;
        responsiveBookMapping[index] = responsiveSection;
    });

    // Function to create dots dynamically based on totalSections
    function createDots() {
        const dotsContainer = carouselSection.querySelector('.carouselDots');
        // Clear existing dots
        dotsContainer.innerHTML = '';

        // Create new dots based on totalSections
        for (let i = 0; i < totalSections; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carouselDot');
            dot.setAttribute('data-section', i + 1);

            // Add click event listener
            dot.addEventListener('click', () => {
                currentSection = i + 1;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }
    }

    // Function to update carousel state
    function updateCarousel() {
        // Get current dots (they may have been recreated)
        const currentDots = carouselSection.querySelectorAll('.carouselDot');

        // Update dots active state
        currentDots.forEach((dot, index) => {
            if (index === currentSection - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update arrow buttons
        leftArrow.disabled = (currentSection === 1);
        rightArrow.disabled = (currentSection === totalSections);

        // Update which books are displayed based on responsive sections
        allBooks.forEach((book, index) => {
            const bookResponsiveSection = responsiveBookMapping[index];
            book.style.display = (bookResponsiveSection === currentSection) ? 'block' : 'none';
        });
    }

    // Event listeners for arrow buttons
    leftArrow.addEventListener('click', () => {
        if (currentSection > 1) {
            currentSection--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentSection < totalSections) {
            currentSection++;
            updateCarousel();
        }
    });

    // Create dots and initialize carousel
    createDots();
    updateCarousel();
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize regular carousels (on index.html)
    const carouselSections = document.querySelectorAll('.newInStore, .fallReleases, .comingSoon');
    carouselSections.forEach(section => {
        initCarousel(section);
    });

    // Initialize staff picks carousels (on staff_picks.html)
    const staffPicksCarousels = document.querySelectorAll('.smallerCarousel');
    staffPicksCarousels.forEach(carousel => {
        initStaffPicksCarousel(carousel);
    });
});

// Re-initialize carousels on window resize to handle responsive changes
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-initialize regular carousels
        const carouselSections = document.querySelectorAll('.newInStore, .fallReleases, .comingSoon');
        carouselSections.forEach(section => {
            initCarousel(section);
        });

        // Re-initialize staff picks carousels
        const staffPicksCarousels = document.querySelectorAll('.smallerCarousel');
        staffPicksCarousels.forEach(carousel => {
            initStaffPicksCarousel(carousel);
        });
    }, 250); // Debounce to avoid excessive recalculations
});
