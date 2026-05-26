// =====================================================
// TOOLGRAM MAIN.JS - NO DUPLICATE INFO BOXES
// =====================================================

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

// 4. COMMON INFO BOXES INJECTION (REMOVED – NO LONGER USED TO AVOID DUPLICATE CONTENT)
// The following functions are kept but NOT called. They are not used to prevent duplicate content across all tool pages.
function injectAboutToolGram() {}
function injectWhyChooseUs() {}
function injectFAQCommon() {}
function injectOurPromise() {}
function injectDailyUpdates() {}
function injectSupport() {}
function injectFinalNote() {}
function injectMission() {}
function injectCommunity() {}
function injectTransparency() {}

// 5. GRADIENT HEADING OVERRIDE (for any existing info boxes)
function overrideAllInfoBoxHeadings() {
    const headings = document.querySelectorAll('.info-box h3, .related-section h2');
    headings.forEach(h => {
        if (!h.classList.contains('gradient-heading')) {
            h.classList.add('gradient-heading');
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
    document.querySelectorAll('.blank-space').forEach(space => space.remove());

    const toolContainer = document.querySelector('.tool-container');
    if (toolContainer && !toolContainer.nextElementSibling?.classList.contains('blank-space')) {
        const blankAfterTool = document.createElement('div');
        blankAfterTool.className = 'blank-space';
        blankAfterTool.style.cssText = 'width:100%; height:90px; background:transparent; margin:0; border:none;';
        toolContainer.insertAdjacentElement('afterend', blankAfterTool);
    }

    const boxes = document.querySelectorAll('.info-box, .related-section');
    boxes.forEach((box, index) => {
        const blank = document.createElement('div');
        blank.className = 'blank-space';
        blank.style.cssText = 'width:100%; background:transparent; margin:0; border:none;';
        if (index % 3 === 0) blank.style.height = '90px';
        else if (index % 3 === 1) blank.style.height = '100px';
        else blank.style.height = '120px';
        box.insertAdjacentElement('afterend', blank);
    });
    
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

// 9. FIX TOP PADDING ON TOOL PAGES
function fixPageTopPadding() {
    if (!document.querySelector('.tool-container')) return;
    const style = document.createElement('style');
    style.textContent = `
        .page {
            padding-top: 200px !important; 
        }
    `;
    document.head.appendChild(style);
}

// 10. MAIN FUNCTION (tool pages only) – NO INFO BOX INJECTION
function injectCommonContent() {
    if (!document.querySelector('.tool-container') || document.getElementById('toolgram-common-injected')) return;
    const marker = document.createElement('div');
    marker.id = 'toolgram-common-injected';
    marker.style.display = 'none';
    document.body.appendChild(marker);

    reduceToolInterfaceWidth();
    addSideVerticalAds();
    fixPageTopPadding();

    // *** REMOVED: all injectAboutToolGram, injectWhyChooseUs, etc. to eliminate duplicate content ***

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
        updateFooter();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
