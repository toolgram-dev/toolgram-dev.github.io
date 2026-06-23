// Navigation Manager - Loads nav and reinitializes all functionality
class NavManager {
    static async loadNavigation() {
        try {
            // Load Google Analytics 4 (add this line FIRST)
             this.loadGA4();
            
            
            // Load Adsterra Social Bar
            this.loadAdsterra();

            
            // Load Adsterra Native Banner
            this.loadNativeBanner();

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

    // Adsterra Social Bar loader
    static loadAdsterra() {
        if (document.getElementById('adsterra-script')) return;
        const script = document.createElement('script');
        script.id = 'adsterra-script';
        script.src = 'https://pl28753708.effectivegatecpm.com/20/1d/bc/201dbc9a5125c615b331b8da21bcabfb.js';
        script.async = true;
        document.head.appendChild(script);
    }

    // Google Analytics 4
static loadGA4() {
    if (document.getElementById('ga4-script')) return;
    
    const measurementId = 'G-85J58HNKQL'; // Replace with your actual GA4 ID
    
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);
    
    const initScript = document.createElement('script');
    initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
    `;
    document.head.appendChild(initScript);
}
    static initializeSearch(isToolPage) {
        const searchInput = document.getElementById('nav-search');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput && searchResults) {
            searchInput.oninput = null;
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query, isToolPage, 'search-results');
                } else {
                    searchResults.style.display = 'none';
                }
            });
            
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
            mobileSearchInput.oninput = null;
            
            mobileSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query, isToolPage, 'mobile-search-results');
                } else {
                    mobileSearchResults.style.display = 'none';
                }
            });
            
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
            let dataPath = 'tools-data.json';
            if (isToolPage) {
                dataPath = '../tools-data.json';
            }
            
            const response = await fetch(dataPath);
            const data = await response.json();
            const tools = data.tools;
            
            // Filter tools that match the query
            const queryLower = query.toLowerCase();
            const matches = tools.filter(tool => 
                tool.title.toLowerCase().includes(queryLower) || 
                tool.desc.toLowerCase().includes(queryLower)
            );
            
            // Sort: titles that START with the query first, then contains
            matches.sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                const aStarts = aTitle.startsWith(queryLower);
                const bStarts = bTitle.startsWith(queryLower);
                
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return aTitle.localeCompare(bTitle);
            });
            
            searchResults.innerHTML = '';
            
            if (matches.length === 0) {
                searchResults.innerHTML = '<div class="result-item">No tools found</div>';
            } else {
                matches.forEach(tool => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    item.innerHTML = `
                        <div style="font-weight:600;">${tool.title}</div>
                        <div style="font-size:0.9em;color:rgba(255,255,255,0.6);margin-top:4px;">${tool.desc}</div>
                    `;
                    
                    item.onclick = () => {
                        let toolPath = `tools/${tool.file}`;
                        if (isToolPage) {
                            toolPath = tool.file;
                        }
                        
                        window.location.href = toolPath;
                        
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
    if (!document.querySelector('.logo') && !document.querySelector('.mobile-logo-btn')) {
        setTimeout(() => NavManager.loadNavigation(), 500);
    }
});
