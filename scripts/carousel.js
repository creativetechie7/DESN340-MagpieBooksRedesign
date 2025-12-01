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

// staffPicks Carousel functionality - for staff picks page
function initstaffPicksCarousel(staffPicksCarouselWrapper) {
    let currentSection = 1;
    const totalSections = 2;

    // Get DOM elements within this specific staffPicks carousel
    const arrows = staffPicksCarouselWrapper.querySelectorAll('.staffPicksCarouselArrow');
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];
    const dots = staffPicksCarouselWrapper.querySelectorAll('.staffPicksDot');
    const allBooks = staffPicksCarouselWrapper.querySelectorAll('.staffPicksBookCard[data-section]');

    // Function to update staffPicks carousel state
    function updatestaffPicksCarousel() {
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSection - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update arrow buttons
        if (currentSection === 1) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }

        if (currentSection === totalSections) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }

        // Update which books are displayed
        allBooks.forEach((book) => {
            const bookSection = parseInt(book.getAttribute('data-section'));
            if (bookSection === currentSection) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    }

    // Event listeners for arrow buttons
    leftArrow.addEventListener('click', () => {
        if (currentSection > 1) {
            currentSection--;
            updatestaffPicksCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentSection < totalSections) {
            currentSection++;
            updatestaffPicksCarousel();
        }
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSection = index + 1;
            updatestaffPicksCarousel();
        });
    });

    // Initialize carousel
    updatestaffPicksCarousel();
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize regular carousels
    const carouselSections = document.querySelectorAll('.newInStore, .fallReleases, .comingSoon');
    carouselSections.forEach(section => {
        initCarousel(section);
    });

    // Initialize staffPicks carousels
    const staffPicksCarousels = document.querySelectorAll('.staffPicksCarouselWrapper');
    staffPicksCarousels.forEach(staffPicksCarousel => {
        initstaffPicksCarousel(staffPicksCarousel);
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
    }, 250); // Debounce to avoid excessive recalculations
});
