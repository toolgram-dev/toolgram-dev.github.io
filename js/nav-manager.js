// Navigation Manager - Loads nav and reinitializes all functionality
class NavManager {
    static async loadNavigation() {
        try {
            // DETERMINE CORRECT PATH BASED ON CURRENT PAGE
            const isToolPage = window.location.pathname.includes('/tools/');
            const isRoot = window.location.pathname.endsWith('/') || 
                          window.location.pathname.endsWith('.html') ||
                          window.location.pathname === '';
            
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
            this.initializeMobileSearch(isToolPage);
            
        } catch (error) {
            console.error('Failed to load navigation:', error);
            // Fallback basic navigation
            document.querySelectorAll('.nav-container').forEach(container => {
                container.innerHTML = `
                    <nav style="padding:15px 40px;background:rgba(15,23,42,0.95);display:flex;justify-content:space-between;align-items:center;">
                        <div class="logo" style="cursor:pointer;">
                            <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram" style="height:45px;">
                        </div>
                        <button class="contact-btn" style="background:linear-gradient(135deg,#8B5CF6,#EC4899);color:white;padding:10px 25px;border-radius:50px;border:none;cursor:pointer;">
                            <i class="fas fa-envelope"></i> Contact Us
                        </button>
                    </nav>
                `;
                
                // Add fallback click handlers
                container.querySelector('.logo').onclick = () => {
                    window.location.href = window.location.pathname.includes('/tools/') ? '../index.html' : 'index.html';
                };
                
                container.querySelector('.contact-btn').onclick = () => {
                    window.location.href = window.location.pathname.includes('/tools/') ? '../contact.html' : 'contact.html';
                };
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
                    this.performSearch(query, isToolPage, 'search-results');
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
    
    static initializeMobileSearch(isToolPage) {
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const mobileSearchResults = document.getElementById('mobile-search-results');
        
        if (mobileSearchInput && mobileSearchResults) {
            // Clear previous event listeners
            mobileSearchInput.oninput = null;
            
            // Add new search handler
            mobileSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query, isToolPage, 'mobile-search-results');
                } else {
                    mobileSearchResults.style.display = 'none';
                }
            });
            
            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.mobile-search-nav')) {
                    mobileSearchResults.style.display = 'none';
                }
            });
        }
    }
    
    static async performSearch(query, isToolPage, resultsContainerId) {
        const searchResults = document.getElementById(resultsContainerId);
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
                            toolPath = tool.file;
                        }
                        
                        window.location.href = toolPath;
                        
                        // Clear all search inputs
                        const desktopSearch = document.getElementById('nav-search');
                        const mobileSearch = document.getElementById('mobile-search-input');
                        if (desktopSearch) desktopSearch.value = '';
                        if (mobileSearch) mobileSearch.value = '';
                        
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
        // Desktop Contact button
        const desktopContactBtn = document.querySelector('.nav-buttons-desktop .contact-btn');
        if (desktopContactBtn) {
            desktopContactBtn.onclick = () => {
                let contactPath = 'contact.html';
                if (isToolPage) {
                    contactPath = '../contact.html';
                }
                window.location.href = contactPath;
            };
        }
        
        // Mobile Contact button
        const mobileContactBtn = document.querySelector('.mobile-container .contact-btn');
        if (mobileContactBtn) {
            mobileContactBtn.onclick = () => {
                let contactPath = 'contact.html';
                if (isToolPage) {
                    contactPath = '../contact.html';
                }
                window.location.href = contactPath;
            };
        }
        
        // Desktop Logo click
        const desktopLogo = document.querySelector('.logo');
        if (desktopLogo) {
            desktopLogo.onclick = () => {
                let homePath = 'index.html';
                if (isToolPage) {
                    homePath = '../index.html';
                }
                window.location.href = homePath;
            };
        }
        
        // Mobile Logo button
        const mobileLogoBtn = document.querySelector('.mobile-logo-btn');
        if (mobileLogoBtn) {
            mobileLogoBtn.onclick = () => {
                let homePath = 'index.html';
                if (isToolPage) {
                    homePath = '../index.html';
                }
                window.location.href = homePath;
            };
        }
        
        // Share buttons
        const shareBtn = document.getElementById('share-btn-nav');
        const shareBtnDesktop = document.getElementById('share-btn-nav-desktop');
        
        const shareHandler = () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href,
                    text: 'Check out this tool on ToolGram!'
                });
            }
        };
        
        if (shareBtn) {
            shareBtn.onclick = shareHandler;
            // Show if share API is available
            if (navigator.share) {
                shareBtn.style.display = 'flex';
            }
        }
        
        if (shareBtnDesktop) {
            shareBtnDesktop.onclick = shareHandler;
            if (navigator.share) {
                shareBtnDesktop.style.display = 'flex';
            }
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
    if (!document.querySelector('.logo') && !document.querySelector('.mobile-logo-btn')) {
        setTimeout(() => NavManager.loadNavigation(), 500);
    }
});;
