// ============================================
// COPY BUTTON FUNCTIONALITY (Tumhara existing code)
// ============================================
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

// ============================================
// COMMON INFO SECTIONS (Har page par same)
// ============================================
function injectCommonInfo() {
    // Pehle check karo ke tool page hai ya nahi
    if (!document.querySelector('.tool-container')) return;
    
    // Check karo ke already inject ho chuka hai
    if (document.getElementById('toolgram-common-info')) return;
    
    // Common sections ka HTML (bilkul same style, colors, size)
    const commonHTML = `
        <!-- About ToolGram Section -->
        <div class="info-box" id="toolgram-common-info">
            <h3><i class="fas fa-info-circle" style="color:#8B5CF6;"></i> About ToolGram</h3>
            <p><strong>ToolGram</strong> is a collection of free online tools built by a 16-year-old developer. What started as a small project has grown into 135+ tools, with <strong>10 new tools added daily</strong>. Our mission is simple: make developer tools accessible to everyone, forever free.</p>
        </div>
        
        <!-- BLANK SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Why Choose Us Section -->
        <div class="info-box">
            <h3><i class="fas fa-check-circle" style="color:#8B5CF6;"></i> Why Choose ToolGram?</h3>
            <ul style="color:rgba(255,255,255,0.8); line-height:1.8;">
                <li><strong>✓ 100% Free Forever</strong> — No hidden charges, no premium plans</li>
                <li><strong>✓ No Signup Required</strong> — Use instantly, no account needed</li>
                <li><strong>✓ 10+ New Tools Daily</strong> — Fresh tools added every day</li>
                <li><strong>✓ Privacy First</strong> — All processing happens in your browser</li>
                <li><strong>✓ No Data Storage</strong> — Your data never leaves your device</li>
                <li><strong>✓ Mobile Friendly</strong> — Works perfectly on all devices</li>
            </ul>
        </div>
        
        <!-- BLANK SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Our Promise Section -->
        <div class="info-box">
            <h3><i class="fas fa-handshake" style="color:#8B5CF6;"></i> Our Promise to You</h3>
            <ul style="color:rgba(255,255,255,0.8); line-height:1.8;">
                <li><strong>✓ Accurate Results</strong> — Industry-standard algorithms</li>
                <li><strong>✓ Regular Updates</strong> — New tools and improvements daily</li>
                <li><strong>✓ No Hidden Costs</strong> — What you see is what you get</li>
                <li><strong>✓ User Privacy</strong> — We don't track, store, or sell your data</li>
                <li><strong>✓ Fast Performance</strong> — Instant results, no waiting</li>
            </ul>
        </div>
        
        <!-- BLANK SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Trust & Growth Section -->
        <div class="info-box">
            <h3><i class="fas fa-chart-line" style="color:#8B5CF6;"></i> Trusted by Developers Worldwide</h3>
            <p><strong>135+ tools and growing</strong> — with 10 new tools added every day. ToolGram is built by developers for developers. Every tool is tested, optimized, and completely free. No signup, no ads, no tracking — just tools that work.</p>
        </div>
        
        <!-- BLANK SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Support Section -->
        <div class="info-box">
            <h3><i class="fas fa-headset" style="color:#8B5CF6;"></i> Need Help?</h3>
            <p>We're here to assist you:</p>
            <ul style="color:rgba(255,255,255,0.8); line-height:1.8;">
                <li><strong>📧 Email:</strong> toolgramltd@gmail.com</li>
                <li><strong>⏱️ Response Time:</strong> Within 24 hours (Monday-Friday)</li>
                <li><strong>💬 Feedback:</strong> We love hearing your suggestions</li>
                <li><strong>🐛 Bug Reports:</strong> Help us improve by reporting issues</li>
            </ul>
        </div>
        
        <!-- BLANK SPACE FOR AD -->
        <div class="blank-space"></div>
    `;
    
    // Footer se pehle inject karo
    const footer = document.querySelector('.footer-bg');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', commonHTML);
    }
}

// ============================================
// FOOTER SOCIAL LINKS (© ToolGram 2026 ke RIGHT side mein)
// ============================================
function addFooterSocialLinks() {
    const footer = document.querySelector('.footer-bg .footer-content');
    if (!footer) return;
    
    // Check karo ke already add hain ya nahi
    if (document.getElementById('footer-social-row')) return;
    
    // Copyright element dhundho
    const copyright = footer.querySelector('.copyright');
    if (!copyright) return;
    
    // Copyright text update karo
    copyright.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:center; gap:20px; flex-wrap:wrap;">
            <span style="color:#fff;">© ToolGram 2026</span>
            <div style="display:flex; gap:12px;">
                <a href="https://x.com/toolgram" target="_blank" style="color:#fff; font-size:1rem; text-decoration:none;">
                    <i class="fab fa-x-twitter"></i>
                </a>
                <a href="https://www.reddit.com/user/toolgram" target="_blank" style="color:#fff; font-size:1rem; text-decoration:none;">
                    <i class="fab fa-reddit"></i>
                </a>
                <a href="https://www.linkedin.com/in/toolgram" target="_blank" style="color:#fff; font-size:1rem; text-decoration:none;">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/toolgram" target="_blank" style="color:#fff; font-size:1rem; text-decoration:none;">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    `;
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
function initializeToolGram() {
    setupCopyButtons();
    injectCommonInfo();
    addFooterSocialLinks();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToolGram);
} else {
    initializeToolGram();
}
