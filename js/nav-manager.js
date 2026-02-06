// Navigation Manager - Loads nav and reinitializes all functionality
class NavManager {
    static async loadNavigation() {
        try {
            const response = await fetch('partials/nav.html');
            const navHTML = await response.text();
            
            // Insert nav into all containers
            document.querySelectorAll('.nav-container').forEach(container => {
                container.innerHTML = navHTML;
            });
            
            // REINITIALIZE ALL NAV FUNCTIONALITY
            this.initializeSearch();
            this.initializeNavButtons();
            
        } catch (error) {
            console.error('Failed to load navigation:', error);
        }
    }
    
    static initializeSearch() {
        const searchInput = document.getElementById('nav-search');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput && searchResults) {
            // Remove old listeners
            searchInput.removeEventListener('input', this.searchHandler);
            
            // Add new listener
            this.searchHandler = (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query);
                } else {
                    searchResults.style.display = 'none';
                }
            };
            
            searchInput.addEventListener('input', this.searchHandler);
            
            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search')) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }
    
    static async performSearch(query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;
        
        try {
            const response = await fetch('tools-data.json');
            const data = await response.json();
            
            const results = data.tools.filter(tool => 
                tool.title.toLowerCase().includes(query.toLowerCase()) || 
                tool.desc.toLowerCase().includes(query.toLowerCase())
            );
            
            searchResults.innerHTML = '';
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="result-item">No tools found</div>';
            } else {
                results.forEach(tool => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    item.innerHTML = `
                        <div style="font-weight:600;">${tool.title}</div>
                        <div style="font-size:0.9em;color:rgba(255,255,255,0.6);margin-top:4px;">${tool.desc}</div>
                    `;
                    item.onclick = () => {
                        window.location.href = `tools/${tool.file}`;
                        const searchInput = document.getElementById('nav-search');
                        if (searchInput) searchInput.value = '';
                        searchResults.style.display = 'none';
                    };
                    searchResults.appendChild(item);
                });
            }
            searchResults.style.display = 'block';
        } catch (error) {
            console.error('Search failed:', error);
        }
    }
    
    static initializeNavButtons() {
        // Contact button
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.onclick = () => window.location.href = 'contact.html';
        }
        
        // Logo click
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.onclick = () => window.location.href = 'index.html';
        }
        
        // Share button
        const shareBtn = document.getElementById('share-btn-nav');
        if (shareBtn) {
            shareBtn.onclick = () => {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            };
        }
    }
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    NavManager.loadNavigation();

});

