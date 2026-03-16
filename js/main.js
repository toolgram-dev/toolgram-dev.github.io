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
// INFO BOXES KI CSS (Bina main CSS file edit kiye)
// ============================================
function addInfoBoxStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .info-box {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .info-box h2, .info-box h3 {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #07C5F5, #FF00E1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .info-box h3 {
            font-size: 1.5rem;
        }
        
        .info-box p {
            color: rgba(255,255,255,0.8);
            line-height: 1.8;
            margin-bottom: 12px;
            font-size: 1rem;
        }
        
        .info-box ul, .info-box ol {
            color: rgba(255,255,255,0.8);
            line-height: 1.8;
            padding-left: 25px;
            margin-bottom: 15px;
        }
        
        .info-box li {
            margin-bottom: 8px;
        }
        
        .blank-space {
            width: 100%;
            height: 100px;
            background: transparent;
            margin: 25px 0;
            border: none;
        }
        
        .highlight {
            color: #8B5CF6;
            font-weight: 600;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #07C5F5, #FF00E1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .pill {
            display: inline-block;
            background: rgba(139,92,246,0.1);
            border: 1px solid rgba(139,92,246,0.3);
            border-radius: 50px;
            padding: 5px 15px;
            margin: 5px;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.9);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// COMMON INFO SECTIONS (Har page par same - SACH KE SAATH)
// ============================================
function injectCommonInfo() {
    // Pehle check karo ke tool page hai ya nahi
    if (!document.querySelector('.tool-container')) return;
    
    // Check karo ke already inject ho chuka hai
    if (document.getElementById('toolgram-common-info')) return;
    
    // Common sections ka HTML (SACHCHE FACTS)
    const commonHTML = `
        <!-- About ToolGram Section -->
        <div class="info-box" id="toolgram-common-info">
            <h3><i class="fas fa-info-circle" style="color:#8B5CF6;"></i> About ToolGram</h3>
            <p><strong>ToolGram</strong> is a collection of free online tools. What started as a small project is growing steadily, with new tools added regularly. Our goal is to make useful tools accessible to everyone, and we strive to be honest about what we offer.</p>
            <p>We don't promise perfection — only that we'll do our best. If something doesn't work, let us know and we'll try to fix it.</p>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- What We Try To Be Section (99% wala) -->
        <div class="info-box">
            <h3><i class="fas fa-heart" style="color:#8B5CF6;"></i> What We Strive For</h3>
            <ul style="color:rgba(255,255,255,0.8); line-height:1.8;">
                <li><strong>✓ 99% Free Forever</strong> — We aim to keep everything free, but if circumstances change, we'll be transparent about it.</li>
                <li><strong>✓ No Signup Required</strong> — Use tools instantly, no account needed.</li>
                <li><strong>✓ Regular Updates</strong> — We try to add new tools consistently, but life happens. We do our best.</li>
                <li><strong>✓ Privacy First</strong> — All processing happens in your browser. Your data stays with you.</li>
                <li><strong>✓ No Data Storage</strong> — We don't store anything you input.</li>
                <li><strong>✓ Mobile Friendly</strong> — Works on phones, tablets, and computers.</li>
            </ul>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Our Intention Section (Islamic tone) -->
        <div class="info-box">
            <h3><i class="fas fa-hands-helping" style="color:#8B5CF6;"></i> Our Intention</h3>
            <p>We believe in helping others without expecting anything in return. If these tools benefit someone, we're grateful. If something falls short, we hope you'll forgive us — we're only human, learning and improving every day.</p>
            <p>We don't make promises we can't keep. We simply try our best, and we hope that's enough.</p>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- What's Here Section (Honest) -->
        <div class="info-box">
            <h3><i class="fas fa-tools" style="color:#8B5CF6;"></i> What You'll Find Here</h3>
            <p>A growing collection of tools — how many? Let's just say <span class="highlight">many</span>. We add new ones when we can, and we try to make each one useful.</p>
            <p>Some tools are simple. Some are complex. All are made with the intention of helping.</p>
            <div style="margin-top:15px;">
                <span class="pill">JSON Tools</span>
                <span class="pill">Text Tools</span>
                <span class="pill">Color Tools</span>
                <span class="pill">Developer Tools</span>
                <span class="pill">Conversion Tools</span>
                <span class="pill">Security Tools</span>
                <span class="pill">And many more...</span>
            </div>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Statistics Section (Real numbers) -->
        <div class="info-box">
            <h3><i class="fas fa-chart-line" style="color:#8B5CF6;"></i> Current Status</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:20px; margin-top:20px;">
                <div style="text-align:center;">
                    <div class="stat-number">∞</div>
                    <div style="color:rgba(255,255,255,0.7);">Tools (Growing)</div>
                </div>
                <div style="text-align:center;">
                    <div class="stat-number">30k+</div>
                    <div style="color:rgba(255,255,255,0.7);">Monthly Impressions</div>
                </div>
                <div style="text-align:center;">
                    <div class="stat-number">40%</div>
                    <div style="color:rgba(255,255,255,0.7);">US Traffic</div>
                </div>
            </div>
            <p style="margin-top:20px;">Used by developers in the US, UK, Germany, Canada, and beyond. We're humbled by every visit.</p>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- How You Can Help -->
        <div class="info-box">
            <h3><i class="fas fa-envelope" style="color:#8B5CF6;"></i> Get Involved</h3>
            <p>Found a bug? Have an idea? Just want to say hello?</p>
            <ul style="color:rgba(255,255,255,0.8); line-height:1.8;">
                <li><strong>📧 Email:</strong> toolgramltd@gmail.com</li>
                <li><strong>⏱️ Response Time:</strong> We try to reply within 24 hours (Monday-Friday). If we're slow, please be patient — we're doing our best.</li>
                <li><strong>💬 Feedback:</strong> All feedback is welcome — good or bad. It helps us improve.</li>
            </ul>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
        <div class="blank-space"></div>
        
        <!-- Why We Do This -->
        <div class="info-box">
            <h3><i class="fas fa-question-circle" style="color:#8B5CF6;"></i> Why We Built This</h3>
            <p>Because tools should be accessible. Because a developer somewhere might need a quick JSON formatter at 2am and shouldn't have to sign up for anything. Because helping others is its own reward.</p>
            <p>If you benefit from this, that's enough. No expectations. No strings attached.</p>
        </div>
        
        <!-- BILKUL KHALI SPACE FOR AD -->
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
    
    // Copyright text update karo - SIRF X, REDDIT, GITHUB
    copyright.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:center; gap:30px; flex-wrap:wrap;">
            <span style="color:#fff; font-size:0.95rem;">© ToolGram 2026</span>
            <div style="display:flex; gap:20px;">
                <a href="https://x.com/toolgram" target="_blank" style="color:#fff; font-size:1.2rem; text-decoration:none;">
                    <i class="fab fa-x-twitter"></i>
                </a>
                <a href="https://www.reddit.com/user/toolgram" target="_blank" style="color:#fff; font-size:1.2rem; text-decoration:none;">
                    <i class="fab fa-reddit"></i>
                </a>
                <a href="https://github.com/toolgram" target="_blank" style="color:#fff; font-size:1.2rem; text-decoration:none;">
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
    addInfoBoxStyles();      // CSS inject karo
    setupCopyButtons();      // Copy buttons
    injectCommonInfo();      // Info boxes
    addFooterSocialLinks();  // Footer links
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToolGram);
} else {
    initializeToolGram();
}
