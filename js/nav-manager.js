// Navigation Manager - Loads nav and reinitializes all functionality
class NavManager {
    static async loadNavigation() {
        try {
            // Load Google Analytics 4 (add this line FIRST)
             this.loadGA4();
            
            // Load AADS Banner (only on tool pages)
            this.loadAADSBanner();
            
            // Load Adsterra Social Bar
            this.loadAdsterra();

            // Load PopAds
            this.loadPopAds();
            
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

    // AADS 728x90 Banner (responsive, only on tool pages)
    static loadAADSBanner() {
        if (!document.querySelector('.tool-container')) return;
        if (document.getElementById('aads-banner')) return;
        
        const bannerDiv = document.createElement('div');
        bannerDiv.id = 'aads-banner';
        bannerDiv.style.cssText = 'width:100%; text-align:center; margin:0 auto 20px auto; padding:0;';
        bannerDiv.innerHTML = `
            <div style="width:100%; max-width:728px; margin:0 auto; position:relative;">
                <iframe data-aa='2432556' src='//ad.a-ads.com/2432556/?size=728x90&background_color=1a0b2e&title_color=ffffff&title_hover_color=ffffff&text_color=ffffff&link_color=ffffff&link_hover_color=ffffff'
                    style='border:0; padding:0; width:100%; height:auto; aspect-ratio:728/90; display:block; margin:auto;'></iframe>
                <div style="width:100%; margin:auto; position:absolute; left:0; right:0; bottom:0; text-align:center;">
                    <a target="_blank" style="display:inline-block; font-size:11px; color:#999; padding:2px 5px; background:#111; text-decoration:none; border-radius:0 0 4px 4px;" href="https://aads.com/campaigns/new/?source_id=2432556&source_type=ad_unit&partner=2432556">Advertise here</a>
                </div>
            </div>
        `;
        
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.insertAdjacentElement('afterend', bannerDiv);
        } else {
            document.body.insertBefore(bannerDiv, document.body.firstChild);
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

    // PopAds loader
    static loadPopAds() {
        if (document.getElementById('popads-script')) return;

        const script = document.createElement('script');
        script.id = 'popads-script';
        script.type = 'text/javascript';
        script.setAttribute('data-cfasync', 'false');

        script.innerHTML = `
/*<![CDATA[/* */
(function(){var x=window,w="d6cbd252fd615fb2e6e27ba92f17006c",v=[["siteId",245*945+912+5045960],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],p=["d3d3LmNkbjRhZHMuY29tL0NwcnlWQS9uZm91bmRhdGlvbi5taW4uanM=","ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvbGRCL210dHBZbS90c2ltcGxlLWpla3lsbC1zZWFyY2gubWluLmNzcw=="],l=-1,m,q,t=function(){clearTimeout(q);l++;if(p[l]&&!(1797542659000<(new Date).getTime()&&1<l)){m=x.document.createElement("script");m.type="text/javascript";m.async=!0;var c=x.document.getElementsByTagName("script")[0];m.src="https://"+atob(p[l]);m.crossOrigin="anonymous";m.onerror=t;m.onload=function(){clearTimeout(q);x[w.slice(0,16)+w.slice(0,16)]||t()};q=setTimeout(t,5E3);c.parentNode.insertBefore(m,c)}};if(!x[w]){try{Object.freeze(x[w]=v)}catch(e){}t()}})();
/*]]>/* */
        `;

        document.head.appendChild(script);
    }

    // Adsterra Native Banner
    static loadNativeBanner() {
        if (document.getElementById('native-banner-script')) return;
        
        // Add the div container first
        const container = document.createElement('div');
        container.id = 'container-f2d3b03b2fb4632131e91a84149b1140';
        document.body.appendChild(container);

        // Then add the script
        const script = document.createElement('script');
        script.id = 'native-banner-script';
        script.src = 'https://pl28764872.effectivegatecpm.com/f2d3b03b2fb4632131e91a84149b1140/invoke.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.body.appendChild(script);
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
