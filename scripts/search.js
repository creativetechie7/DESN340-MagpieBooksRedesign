// Search functionality with dropdown autocomplete

// Book database - add your books here with their pages
const bookDatabase = [
    {
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        url: "book_Addie_LaRue_information.html"
    },
    {
        title: "Always Remember",
        author: "Charlie Mackesy",
        url: "index.html#newInStore"
    },
    {
        title: "Bread of Angels",
        author: "Patti Smith",
        url: "index.html#newInStore"
    },
    {
        title: "Broken",
        author: "X Fang",
        url: "index.html#newInStore"
    },
    {
        title: "Elbows Up",
        author: "Elamin Abdelmahmoud",
        url: "index.html#newInStore"
    },
    {
        title: "Lady Ferry",
        author: "Sarah Orne Jewett",
        url: "index.html#newInStore"
    },
    // Add more books as needed
];

// Initialize search functionality after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchButton = document.querySelector('.searchBar button');

    // Check if elements exist
    if (!searchInput || !searchDropdown) {
        console.error('Search elements not found');
        return;
    }

    // Search and filter books
    function searchBooks(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const searchTerm = query.toLowerCase();

        return bookDatabase.filter(book => {
            const titleMatch = book.title.toLowerCase().includes(searchTerm);
            const authorMatch = book.author.toLowerCase().includes(searchTerm);
            return titleMatch || authorMatch;
        });
    }

    // Display search results in dropdown
    function displayResults(results) {
        // Clear previous results
        searchDropdown.innerHTML = '';

        if (results.length === 0) {
            searchDropdown.innerHTML = '<div class="noResults">No books found</div>';
            searchDropdown.classList.add('show');
            return;
        }

        // Create dropdown items
        results.forEach(book => {
            const item = document.createElement('div');
            item.className = 'searchDropdownItem';
            item.innerHTML = `
                <div class="bookTitleResult">${book.title}</div>
                <div class="bookAuthorResult">${book.author}</div>
            `;

            // Navigate to book page on click
            item.addEventListener('click', () => {
                window.location.href = book.url;
            });

            searchDropdown.appendChild(item);
        });

        searchDropdown.classList.add('show');
    }

    // Hide dropdown
    function hideDropdown() {
        searchDropdown.classList.remove('show');
    }

    // Event listener for input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;

        if (query.trim().length < 2) {
            hideDropdown();
            return;
        }

        const results = searchBooks(query);
        displayResults(results);
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchBar')) {
            hideDropdown();
        }
    });

    // Prevent form submission
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Optionally, navigate to the first result
            const query = searchInput.value;
            const results = searchBooks(query);

            if (results.length > 0) {
                window.location.href = results[0].url;
            }
        });
    }

    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const query = searchInput.value;
            const results = searchBooks(query);

            if (results.length > 0) {
                window.location.href = results[0].url;
            }
        }
    });
});
