// Navigation Manager - Loads nav and reinitializes all functionality
class NavManager {
    static async loadNavigation() {
        try {
            // DETERMINE CORRECT PATH BASED ON CURRENT PAGE
            const isToolPage = window.location.pathname.includes('/tools/') || window.location.href.includes('/tools/');
            let navPath = 'partials/nav.html';
            
            if (isToolPage) {
                navPath = '../partials/nav.html';
            }
            
            console.log('Loading navigation from:', navPath);
            
            const response = await fetch(navPath);
            
            if (!response.ok) {
                throw new Error(`Navigation file not found at: ${navPath}`);
            }
            
            const navHTML = await response.text();
            
            // Insert nav into all containers
            document.querySelectorAll('.nav-container').forEach(container => {
                container.innerHTML = navHTML;
            });
            
            // REINITIALIZE ALL NAV FUNCTIONALITY
            this.initializeSearch(isToolPage);
            this.initializeNavButtons(isToolPage);
            
        } catch (error) {
            console.error('Failed to load navigation:', error);
            // Fallback basic navigation
            document.querySelectorAll('.nav-container').forEach(container => {
                container.innerHTML = `
                    <nav style="padding:15px 40px;background:rgba(15,23,42,0.95);display:flex;justify-content:space-between;align-items:center;">
                        <div class="logo" onclick="window.location.href='index.html'" style="cursor:pointer;">
                            <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram" style="height:45px;">
                        </div>
                        <button class="contact-btn" onclick="window.location.href='contact.html'" style="background:linear-gradient(135deg,#8B5CF6,#EC4899);color:white;padding:10px 25px;border-radius:50px;border:none;cursor:pointer;">
                            <i class="fas fa-envelope"></i> Contact Us
                        </button>
                    </nav>
                `;
            });
        }
    }
    
    static initializeSearch(isToolPage) {
        const searchInput = document.getElementById('nav-search');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput && searchResults) {
            // Clear previous event listeners
            searchInput.oninput = null;
            
            // Add new search handler
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query, isToolPage);
                } else {
                    searchResults.style.display = 'none';
                }
            });
            
            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search')) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }
    
    static async performSearch(query, isToolPage) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;
        
        try {
            // Determine correct path for tools-data.json
            let dataPath = 'tools-data.json';
            if (isToolPage) {
                dataPath = '../tools-data.json';
            }
            
            const response = await fetch(dataPath);
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
                        // Determine correct path for tool file
                        let toolPath = `tools/${tool.file}`;
                        if (isToolPage) {
                            toolPath = `${tool.file}`;
                        }
                        
                        window.location.href = toolPath;
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
            searchResults.innerHTML = '<div class="result-item">Search unavailable</div>';
            searchResults.style.display = 'block';
        }
    }
    
    static initializeNavButtons(isToolPage) {
        // Contact button
        const contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.onclick = () => {
                let contactPath = 'contact.html';
                if (isToolPage) {
                    contactPath = '../contact.html';
                }
                window.location.href = contactPath;
            };
        }
        
        // Logo click
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.onclick = () => {
                let homePath = 'index.html';
                if (isToolPage) {
                    homePath = '../index.html';
                }
                window.location.href = homePath;
            };
        }
        
        // Share button
        const shareBtn = document.getElementById('share-btn-nav');
        if (shareBtn) {
            shareBtn.onclick = () => {
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: window.location.href,
                        text: 'Check out this tool on ToolGram!'
                    });
                }
            };
        }
    }
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    NavManager.loadNavigation();
});

// Also load navigation when page is fully loaded (as backup)
window.addEventListener('load', () => {
    // Check if navigation loaded, if not, try again
    if (!document.querySelector('.logo')) {
        setTimeout(() => NavManager.loadNavigation(), 500);
    }
});
