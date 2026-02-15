// Main Application Script
// Handles dynamic content updates and Element SDK integration

const defaultConfig = window.siteConfig || {};
let config = { ...defaultConfig };

function updateDOM() {
    // Header Elements
    const logoBox = document.getElementById('logoBox');
    if (logoBox) logoBox.textContent = config.logo_text || defaultConfig.logo_text;

    const schoolLogoImg = document.getElementById('schoolLogoImg');
    if (schoolLogoImg) {
        schoolLogoImg.src = config.schoollogo || defaultConfig.schoollogo || './picture/Nova.jpg';
    }

    const companyName = document.getElementById('companyName');
    if (companyName) companyName.textContent = config.company_name || defaultConfig.company_name;

    const taglineText = document.getElementById('taglineText');
    if (taglineText) taglineText.textContent = config.tagline || defaultConfig.tagline;

    // PR Section (index.html, about.html)
    const prTitle = document.getElementById('prTitle');
    if (prTitle) prTitle.textContent = config.pr_title || defaultConfig.pr_title;

    const prContent = document.getElementById('prContent');
    if (prContent) prContent.textContent = config.pr_content || defaultConfig.pr_content;

    // Contact Info (contact.html)
    const emailLink = document.getElementById('emailDisplay');
    if (emailLink) {
        const email = config.email || defaultConfig.email;
        emailLink.href = `mailto:${email}`;
        emailLink.innerHTML = `${email}`;
    }

    const phoneLink = document.getElementById('phoneDisplay');
    if (phoneLink) {
        const phone = config.phone || defaultConfig.phone;
        phoneLink.href = `tel:${phone.replace(/\s/g, '').replace(/-/g, '')}`;
        phoneLink.innerHTML = `${phone}`;
    }

    const addressDisplay = document.getElementById('addressDisplay');
    if (addressDisplay) addressDisplay.textContent = config.address || defaultConfig.address;

    // Social Links
    const socialGrid = document.getElementById('socialGrid');
    if (socialGrid && (config.facebook || config.instagram)) {
        let socialHtml = '';

        if (config.facebook && config.facebook !== '#') {
            socialHtml += `
                <a href="${config.facebook}" target="_blank" class="social-btn facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
                    Facebook
                </a>
            `;
        }

        if (config.instagram && config.instagram !== '#') {
            socialHtml += `
                <a href="${config.instagram}" target="_blank" class="social-btn instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/></svg>
                    Instagram
                </a>
            `;
        }

        socialGrid.innerHTML = socialHtml;
    }
}

// Initial update on load
document.addEventListener('DOMContentLoaded', updateDOM);

// Element SDK Integration
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        async onConfigChange(newConfig) {
            config = newConfig;
            updateDOM();
        },
        mapToCapabilities() {
            return {
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        },
        mapToEditPanelValues() {
            return new Map([
                ["company_name", config.company_name || defaultConfig.company_name],
                ["logo_text", config.logo_text || defaultConfig.logo_text],
                ["schoollogo", config.schoollogo || defaultConfig.schoollogo],
                ["tagline", config.tagline || defaultConfig.tagline],
                ["pr_title", config.pr_title || defaultConfig.pr_title],
                ["pr_content", config.pr_content || defaultConfig.pr_content],
                ["email", config.email || defaultConfig.email],
                ["phone", config.phone || defaultConfig.phone],
                ["address", config.address || defaultConfig.address],
                ["facebook", config.facebook || defaultConfig.facebook],
                ["instagram", config.instagram || defaultConfig.instagram]
            ]);
        }
    });
}
