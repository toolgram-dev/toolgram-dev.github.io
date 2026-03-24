// 1. COPY BUTTON FUNCTIONALITY (only on tool pages)
function setupCopyButtons() {
    if (!document.querySelector('.tool-container')) return;
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

// 2. REDUCE TOOL INTERFACE WIDTH
function reduceToolInterfaceWidth() {
    const style = document.createElement('style');
    style.textContent = `
        .tool-container {
            max-width: 85% !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }
        @media (max-width: 768px) {
            .tool-container {
                max-width: 95% !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// 3. ADD AD MARKERS TO BLANK SPACES (in‑content)
function addAdMarkers() {
    const blankSpaces = document.querySelectorAll('.blank-space');
    const sizes = [
        { minHeight: '90px', adSize: '300x250' },
        { minHeight: '100px', adSize: '300x250' },
        { minHeight: '120px', adSize: '728x90' },
        { minHeight: '90px', adSize: '300x250' },
        { minHeight: '100px', adSize: '300x250' },
        { minHeight: '120px', adSize: '300x600' }
    ];
    blankSpaces.forEach((space, index) => {
        const size = sizes[index % sizes.length];
        space.style.minHeight = size.minHeight;
        space.setAttribute('data-ad-slot', 'true');
        space.setAttribute('data-ad-size', size.adSize);
        space.setAttribute('data-ad-location', 'in-content');
        space.innerHTML = '';
        space.style.background = 'transparent';
        space.style.border = 'none';
        space.style.margin = '0';
        space.style.padding = '0';
    });
}

// 4. COMMON INFO BOXES INJECTION
function injectAboutToolGram() {
    if (document.getElementById('toolgram-about')) return;
    const html = '<div id="toolgram-about" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-info-circle" style="color:#8B5CF6;"></i> About ToolGram</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-bottom:12px;">ToolGram is a comprehensive collection of over 140+ free online tools built by a passionate 16-year-old developer from Pakistan. The project started as a simple idea to help fellow developers and designers work more efficiently without spending money on expensive software. Today, ToolGram has grown into one of the most diverse tool collections on the internet, covering everything from text manipulation and image processing to mathematical calculations and data conversion.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">What makes ToolGram special is our commitment to quality and user experience. Every tool is carefully crafted with clean code, intuitive interfaces, and extensive testing to ensure accuracy. We believe that essential utilities should be accessible to everyone, regardless of their budget or technical expertise. That\'s why we keep everything completely free with no signups, no tracking, and no hidden limitations.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectWhyChooseUs() {
    if (document.getElementById('toolgram-why-choose')) return;
    const html = '<div id="toolgram-why-choose" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i> Why Choose ToolGram</h3><div style="display:grid; grid-template-columns:repeat(2,1fr); gap:15px; margin-bottom:15px;"><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>100% Free Forever</strong> – No premium plans, no hidden fees, no usage limits. All tools are completely free for everyone, forever.</div><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>No Signup Required</strong> – Just visit the tool you need and start using it instantly. No accounts, no emails, no passwords to remember.</div><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>140+ Tools & Growing</strong> – Our collection covers text, images, colors, numbers, development, security, and more. New tools added regularly.</div><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>10 New Tools Daily</strong> – We\'re constantly expanding our library. Check back every day to discover new utilities for your workflow.</div><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>Privacy Focused</strong> – All processing happens in your browser. We never collect, store, or share your data. What you use stays on your device.</div><div style="background:rgba(139,92,246,0.05); padding:15px; border-radius:8px;"><span style="color:#8B5CF6; font-weight:700;">✓</span> <strong>No Tracking</strong> – No analytics, no cookies, no fingerprinting. Your privacy is our priority. Use tools without being monitored.</div></div><p style="color:rgba(255,255,255,0.8); line-height:1.6;">Unlike other tool websites that bombard you with ads, limit free usage, or collect your data, ToolGram is built with a different philosophy. We believe that essential utilities should be accessible to everyone without compromise. Our 16-year-old founder created this platform to give back to the developer community that taught him so much.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectFAQCommon() {
    if (document.getElementById('toolgram-faq-common')) return;
    const html = '<div id="toolgram-faq-common" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-question-circle" style="color:#8B5CF6;"></i> Frequently Asked Questions</h3><div class="faq-question" style="color:#fff; font-size:1.1rem; font-weight:700; margin-top:15px;">Are all tools really free?</div><div class="faq-answer" style="color:rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:15px; line-height:1.6; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Yes, absolutely 100% free forever. There are no premium versions, no hidden charges, no usage limits, and no "pro" features locked behind paywalls. Every single tool on ToolGram is completely free for everyone, whether you use it once or a thousand times.</div><div class="faq-question" style="color:#fff; font-size:1.1rem; font-weight:700; margin-top:15px;">Do I need to create an account?</div><div class="faq-answer" style="color:rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:15px; line-height:1.6; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">No signup or registration is required. Just visit the tool you need and start using it instantly. We don\'t ask for emails, passwords, or any personal information. Your privacy matters to us, so we designed ToolGram to be completely anonymous.</div><div class="faq-question" style="color:#fff; font-size:1.1rem; font-weight:700; margin-top:15px;">How does ToolGram make money?</div><div class="faq-answer" style="color:rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:15px; line-height:1.6; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">We don\'t! ToolGram is a passion project created by a 16-year-old developer who wanted to give back to the community. There are no investors, no shareholders, and no profit motives. We may add unobtrusive ads in the future to cover hosting costs, but core tools will always remain free.</div><div class="faq-question" style="color:#fff; font-size:1.1rem; font-weight:700; margin-top:15px;">How often are new tools added?</div><div class="faq-answer" style="color:rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:15px; line-height:1.6; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">We add approximately 10 new tools every day. Our collection has grown to over 140 tools and continues to expand rapidly. If you don\'t see a tool you need today, check back tomorrow — it might be added!</div><div class="faq-question" style="color:#fff; font-size:1.1rem; font-weight:700; margin-top:15px;">Is my data safe?</div><div class="faq-answer" style="color:rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:15px; line-height:1.6; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">All processing happens locally in your browser. Your files, text, and data never leave your device. We have no servers that store or process your information. This means your sensitive data stays completely private and secure.</div></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectOurPromise() {
    if (document.getElementById('toolgram-promise')) return;
    const html = '<div id="toolgram-promise" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-handshake" style="color:#8B5CF6;"></i> Our Promise to You</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-bottom:15px;">Every tool on ToolGram is built with a simple philosophy: accuracy, speed, and privacy above all else. We don\'t cut corners, we don\'t collect data, and we don\'t try to trick you into premium plans. Each tool undergoes rigorous testing to ensure it produces correct results every time.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6;">We promise that ToolGram will always remain free, always respect your privacy, and always deliver high-quality utilities that solve real problems. If you ever encounter an issue or have a suggestion for improvement, we\'re just an email away. Your feedback directly shapes the future of this platform.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectDailyUpdates() {
    if (document.getElementById('toolgram-updates')) return;
    const html = '<div id="toolgram-updates" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-calendar-alt" style="color:#8B5CF6;"></i> Daily Updates & New Tools</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">ToolGram is constantly evolving with approximately 10 new tools added every single day. Our founder works tirelessly to identify useful utilities that developers, designers, and creators need most. This rapid growth means you\'ll always find something new and valuable each time you visit.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">We also regularly update existing tools based on user feedback. If a tool can be improved, made faster, or offer more features — we make it happen. The roadmap includes community-requested tools, so don\'t hesitate to reach out with suggestions. Your ideas could become the next addition to ToolGram!</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectSupport() {
    if (document.getElementById('toolgram-support')) return;
    const html = '<div id="toolgram-support" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-headset" style="color:#8B5CF6;"></i> Support & Feedback</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">We value your feedback and are here to help with any questions, issues, or suggestions. Whether you\'ve found a bug, need help using a tool, or have an idea for a new utility, we want to hear from you. Our commitment is to respond to every inquiry within 24 hours, usually much faster.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;"><strong>Email us at:</strong> <a href="mailto:toolgramltd@gmail.com" style="color:#8B5CF6; text-decoration:none;">toolgramltd@gmail.com</a><br>You can also reach out on GitHub or Reddit (links in footer). Your input directly shapes the future of ToolGram. Together, we can build the most useful free tool collection on the internet.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectFinalNote() {
    if (document.getElementById('toolgram-final-note')) return;
    const html = '<div id="toolgram-final-note" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-star" style="color:#8B5CF6;"></i> A Final Note From the Creator</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">I started ToolGram when I was just 16 years old, with a simple goal: create the tools I wished existed but couldn\'t afford. Today, seeing thousands of developers, designers, and students using these utilities every day is incredibly humbling. What began as a personal project has grown into a resource used worldwide.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">I believe that essential tools should be free for everyone, regardless of their background or budget. That\'s why ToolGram will always remain free, with no ads that compromise your experience and no data collection that compromises your privacy. If you find this platform useful, please share it with others who might benefit. And if you have ideas for new tools, I\'m always listening. Thank you for being part of this journey!</p><p style="color:#8B5CF6; font-weight:600; margin-top:15px; text-align:right;">— The 16-Year-Old Creator of ToolGram</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectMission() {
    if (document.getElementById('toolgram-mission')) return;
    const html = '<div id="toolgram-mission" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-bullseye" style="color:#8B5CF6;"></i> Our Mission & Vision</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">ToolGram\'s mission is simple: democratize access to high-quality digital utilities. We believe that financial constraints should never limit anyone\'s ability to create, learn, or build. By providing 100% free tools, we\'re leveling the playing field for students, hobbyists, freelancers, and professionals in developing countries where expensive software is out of reach.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">Our vision is to build the world\'s most comprehensive free tool library — one that rivals paid alternatives in quality and functionality. We\'re not just creating tools; we\'re building a community of creators who believe that knowledge and resources should be shared freely. Every tool we add is another small step toward that vision.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectCommunity() {
    if (document.getElementById('toolgram-community')) return;
    const html = '<div id="toolgram-community" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-users" style="color:#8B5CF6;"></i> Join Our Community</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">ToolGram isn\'t just a website — it\'s a growing community of developers, designers, and creators who believe in free and open access to digital tools. You can connect with us on <a href="https://github.com/toolgram-dev/toolgram-dev.github.io" style="color:#8B5CF6; text-decoration:none;">GitHub</a> where the entire project is open source, or follow our journey on <a href="https://www.reddit.com/user/Hot-Reward7234/" style="color:#8B5CF6; text-decoration:none;">Reddit</a> where we share updates and gather feedback.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">Community involvement directly shapes ToolGram\'s direction. Many tools exist because users requested them. Bug reports help us improve. Feature suggestions become reality. We welcome your participation — whether you\'re reporting an issue, suggesting a new tool, or just sharing the platform with others. Together, we can build something truly valuable for everyone.</p><div style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px; display:flex; align-items:center; gap:10px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg><a href="https://x.com/ToolgramL99971" target="_blank" style="color:#8B5CF6; text-decoration:none;">Follow us on X (Twitter)</a></div></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}
function injectTransparency() {
    if (document.getElementById('toolgram-transparency')) return;
    const html = '<div id="toolgram-transparency" class="tool-content-section" style="margin-top:0;"><div class="info-box" style="background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:25px;"><h3 class="gradient-heading" style="font-size:1.8rem; font-weight:700; margin-bottom:15px;"><i class="fas fa-eye" style="color:#8B5CF6;"></i> Transparency & Open Source</h3><p style="color:rgba(255,255,255,0.8); line-height:1.6;">Everything about ToolGram is transparent. The entire codebase is open source and available on <a href="https://github.com/toolgram-dev/toolgram-dev.github.io" style="color:#8B5CF6; text-decoration:none;">GitHub</a> for anyone to inspect, learn from, or contribute to. We have nothing to hide — no secret data collection, no hidden algorithms, no black boxes.</p><p style="color:rgba(255,255,255,0.8); line-height:1.6; margin-top:12px;">This transparency extends to our development process. You can see exactly how each tool works, when changes were made, and why. Developers can audit our code to verify that we\'re not doing anything shady with user data. Students can learn from our implementations. This openness is core to our philosophy of trust and community.</p></div></div>';
    const footer = document.querySelector('.footer-bg');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
}

// 5. GRADIENT HEADING OVERRIDE (for all info boxes and related section)
function overrideAllInfoBoxHeadings() {
    const headings = document.querySelectorAll('.info-box h3, .related-section h2');
    headings.forEach(h => {
        if (!h.classList.contains('gradient-heading')) {
            h.classList.add('gradient-heading');
            // Ensure icon is present for common boxes
            if (!h.innerHTML.includes('<i')) {
                if (h.textContent.toLowerCase().includes('faq')) {
                    h.innerHTML = '<i class="fas fa-question-circle" style="color:#8B5CF6;"></i> ' + h.textContent;
                } else if (h.textContent.toLowerCase().includes('how') || h.textContent.toLowerCase().includes('what')) {
                    h.innerHTML = '<i class="fas fa-cog" style="color:#8B5CF6;"></i> ' + h.textContent;
                }
            }
            h.style.fontSize = '1.8rem';
            h.style.fontWeight = '700';
        }
    });
}

// 6. BLANK SPACES AFTER EVERY BOX (including the last)
function addBlankSpacesAndMarkers() {
    // Remove any existing blank spaces
    document.querySelectorAll('.blank-space').forEach(space => space.remove());

    // First, add a blank space after the tool container (if present)
    const toolContainer = document.querySelector('.tool-container');
    if (toolContainer && !toolContainer.nextElementSibling?.classList.contains('blank-space')) {
        const blankAfterTool = document.createElement('div');
        blankAfterTool.className = 'blank-space';
        blankAfterTool.style.cssText = 'width:100%; height:90px; background:transparent; margin:0; border:none;';
        toolContainer.insertAdjacentElement('afterend', blankAfterTool);
    }

    // Select all boxes (both specific and common)
    const boxes = document.querySelectorAll('.info-box, .related-section');
    
    // Insert a blank space after each box
    boxes.forEach((box, index) => {
        const blank = document.createElement('div');
        blank.className = 'blank-space';
        blank.style.cssText = 'width:100%; background:transparent; margin:0; border:none;';
        // Alternate heights for variety
        if (index % 3 === 0) blank.style.height = '90px';
        else if (index % 3 === 1) blank.style.height = '100px';
        else blank.style.height = '120px';
        box.insertAdjacentElement('afterend', blank);
    });
    
    // Now add ad markers
    addAdMarkers();
}
// 7. SIDE VERTICAL ADS (desktop only)
function addSideVerticalAds() {
    if (!document.querySelector('.tool-container')) return;
    if (!document.querySelector('.ad-side-left')) {
        const leftAd = document.createElement('div');
        leftAd.className = 'ad-side-left';
        leftAd.style.cssText = 'position:fixed; left:10px; top:50%; transform:translateY(-50%); width:160px; height:600px; background:transparent; z-index:99; display:none;';
        leftAd.setAttribute('data-ad-slot', 'true');
        leftAd.setAttribute('data-ad-size', '160x600');
        document.body.appendChild(leftAd);
        const rightAd = document.createElement('div');
        rightAd.className = 'ad-side-right';
        rightAd.style.cssText = 'position:fixed; right:10px; top:50%; transform:translateY(-50%); width:160px; height:600px; background:transparent; z-index:99; display:none;';
        rightAd.setAttribute('data-ad-slot', 'true');
        rightAd.setAttribute('data-ad-size', '160x600');
        document.body.appendChild(rightAd);
        const style = document.createElement('style');
        style.textContent = '@media (min-width: 1200px) { .ad-side-left, .ad-side-right { display: block; } }';
        document.head.appendChild(style);
    }
}

// 8. FOOTER UPDATE (all pages)
function updateFooter() {
    const footer = document.querySelector('.footer-bg');
    if (!footer) return;
    const copyright = footer.querySelector('.copyright p');
    if (copyright) {
        copyright.innerHTML = '© ToolGram 2026 ';
        const existing = copyright.querySelectorAll('a');
        existing.forEach(link => link.remove());
        const github = document.createElement('a');
        github.href = 'https://github.com/toolgram-dev/toolgram-dev.github.io';
        github.target = '_blank';
        github.style.cssText = 'color:#fff; text-decoration:none; font-size:1.2rem; margin-left:10px; display:inline-flex; align-items:center; gap:5px;';
        github.innerHTML = '<i class="fab fa-github"></i>';
        const reddit = document.createElement('a');
        reddit.href = 'https://www.reddit.com/user/Hot-Reward7234/';
        reddit.target = '_blank';
        reddit.style.cssText = 'color:#fff; text-decoration:none; font-size:1.2rem; margin-left:10px; display:inline-flex; align-items:center; gap:5px;';
        reddit.innerHTML = '<i class="fab fa-reddit-alien"></i>';
        const x = document.createElement('a');
        x.href = 'https://x.com/ToolgramL99971';
        x.target = '_blank';
        x.style.cssText = 'color:#fff; text-decoration:none; font-size:1.2rem; margin-left:10px; display:inline-flex; align-items:center; gap:5px;';
        x.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>';
        copyright.appendChild(github);
        copyright.appendChild(reddit);
        copyright.appendChild(x);
    }
}

// 9. FIX TOP PADDING ON TOOL PAGES (NEW)
function fixPageTopPadding() {
    if (!document.querySelector('.tool-container')) return;
    const style = document.createElement('style');
    style.textContent = `
        .page {
            padding-top: 120px !important;   /* adjust to your actual nav height */
        }
    `;
    document.head.appendChild(style);
}

// 10. MAIN FUNCTION (tool pages only)
function injectCommonContent() {
    if (!document.querySelector('.tool-container') || document.getElementById('toolgram-common-injected')) return;
    const marker = document.createElement('div');
    marker.id = 'toolgram-common-injected';
    marker.style.display = 'none';
    document.body.appendChild(marker);

    reduceToolInterfaceWidth();
    addSideVerticalAds();
    fixPageTopPadding();   // <--- NEW CALL

    injectAboutToolGram();
    injectWhyChooseUs();
    injectFAQCommon();
    injectOurPromise();
    injectDailyUpdates();
    injectSupport();
    injectFinalNote();
    injectMission();
    injectCommunity();
    injectTransparency();

    addBlankSpacesAndMarkers();
    overrideAllInfoBoxHeadings();
    updateFooter();
}

// 11. INITIALIZATION (all pages)
function initAll() {
    setupCopyButtons();
    if (document.querySelector('.tool-container')) {
        injectCommonContent();
    } else {
        updateFooter(); // ensures footer on non‑tool pages also gets updated
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
