import { config } from '../config/env.js';

/**
 * Send data to Google Apps Script
 * @param {Object} data - Data to send
 * @returns {Promise<Object>}
 */
export const generatePDF = async (data) => {
    // Implementation for sending data to Google Apps Script
    // Using URL from config
    const res = await fetch(config.gasApiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return res.json();
};
