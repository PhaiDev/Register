import { config } from '../config/env.js';

/**
 * Send data to Google Apps Script
 * @param {Object} data - Data to send
 * @returns {Promise<Object>}
 */
const GenPdfUrl = "https://script.google.com/macros/s/AKfycbzHV9cceRrhEcBHAycj7MdXih4TKV1M5moUeoic79xGkISqQrUMMwM1Dj1vos_X7IuLnA/exec"
export const generatePDF = async (data) => {
    // Implementation for sending data to Google Apps Script
    // Using URL from config
    const res = await fetch(GenPdfUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'follow'
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    } else {
        const textResponse = await res.text();
        console.error("GAS returned non-JSON response:", textResponse.substring(0, 200) + '...');
        throw new Error("Invalid response from Google Apps Script PDF generator. Expected JSON.");
    }
};
