// Carousel functionality - supports multiple carousels on the same page
function initCarousel(carouselSection) {
    let currentSection = 1;
    const totalSections = 3;

    // Get DOM elements within this specific carousel section
    const arrows = carouselSection.querySelectorAll('.carouselArrow');
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];
    const dots = carouselSection.querySelectorAll('.carouselDot');
    const allBooks = carouselSection.querySelectorAll('.bookCard[data-section]');

    // Function to update carousel state
    function updateCarousel() {
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
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentSection < totalSections) {
            currentSection++;
            updateCarousel();
        }
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSection = index + 1;
            updateCarousel();
        });
    });

    // Initialize carousel
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
