/* UI Helper - Custom Alerts & Toasts */

class UI {
    static init() {
        // Create container for toasts if not exists
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);

            // Add CSS for animations (only once)
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .custom-toast {
                    min-width: 300px;
                    padding: 16px 20px;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border-left: 5px solid;
                    font-family: 'Inter', sans-serif;
                }
                .toast-success { border-color: #22c55e; }
                .toast-error { border-color: #ef4444; }
                .toast-info { border-color: #3b82f6; }
                
                .toast-icon { font-size: 1.25rem; }
                .toast-content { flex: 1; }
                .toast-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 2px; color: #1e293b; }
                .toast-message { font-size: 0.875rem; color: #64748b; }
                .toast-close { cursor: pointer; color: #94a3b8; border: none; background: none; font-size: 1.2rem; }
                .toast-close:hover { color: #475569; }
            `;
            document.head.appendChild(style);
        }
    }

    static showToast(title, message, type = 'info') {
        this.init();
        const container = document.getElementById('toast-container');

        const toast = document.createElement('div');
        toast.className = `custom-toast toast-${type}`;

        // Icons based on type
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);
    }

    static confirm(message, callback) {
        // Simple custom confirm modal could be added here
        // For now, wrapping native confirm nicely or replacing later
        if (window.confirm(message)) {
            callback();
        }
    }
}

// Expose to global
window.UI = UI;
