// Global search functionality
document.addEventListener('DOMContentLoaded', function() {
    const navSearch = document.getElementById('nav-search');
    const searchResults = document.getElementById('search-results');
    
    if (navSearch && searchResults) {
        navSearch.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search')) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Mobile search (if exists)
    const mobileSearch = document.getElementById('mobile-search-input');
    if (mobileSearch && searchResults) {
        mobileSearch.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
    }
});

function performSearch(query) {
    fetch('tools-data.json')
        .then(response => response.json())
        .then(data => {
            const results = data.tools.filter(tool => 
                tool.title.toLowerCase().includes(query.toLowerCase()) || 
                tool.desc.toLowerCase().includes(query.toLowerCase())
            );
            
            const searchResults = document.getElementById('search-results');
            if (!searchResults) return;
            
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
                        const navSearch = document.getElementById('nav-search');
                        const mobileSearch = document.getElementById('mobile-search-input');
                        if (navSearch) navSearch.value = '';
                        if (mobileSearch) mobileSearch.value = '';
                        searchResults.style.display = 'none';
                    };
                    searchResults.appendChild(item);
                });
            }
            searchResults.style.display = 'block';
        })
        .catch(error => {
            console.error('Search error:', error);
            const searchResults = document.getElementById('search-results');
            if (searchResults) {
                searchResults.innerHTML = '<div class="result-item">Search unavailable</div>';
                searchResults.style.display = 'block';
            }
        });
}

// Copy button functionality
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const textarea = document.getElementById(targetId);
            if (textarea) {
                textarea.select();
                document.execCommand('copy');
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.classList.add('copied');
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied');
                }, 2000);
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCopyButtons);
} else {
    setupCopyButtons();
}S