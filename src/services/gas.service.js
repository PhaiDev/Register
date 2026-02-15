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
        body: JSON.stringify(data)
    });

    return res.json();
};

export const generatePDF = sendToGAS; // Alias for compatibility if needed
