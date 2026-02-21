import { config } from '../config/env.js';

/**
 * Generate PDF document
 * @param {Object} data - Data for PDF generation
 * @returns {Promise<Buffer>}
 */
export const sendToGAS = async (data) => {
    const res = await fetch(config.gasApiKey, {
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
        console.error("GAS returned non-JSON response:", textResponse);
        throw new Error("Invalid response from Google Apps Script. Expected JSON.");
    }
};

export const generatePDF = sendToGAS; // Alias for compatibility if needed
