import { config } from '../config/env.js';

/**
 * Send email notification
 * @param {Object} data - Email data
 * @returns {Promise<Object>}
 */
const GasSheetUrl = "https://script.google.com/macros/s/AKfycbwE6CW3ujLEceOuvhk44_fkYlsalbYRaWZB7-OQ2H4P2wtyn08XANvvbIX6TBoOzypuEg/exec"
export const getSheet = async (data) => {
    // Implementation for sending email
    // Example: using nodemailer or email service API
    const res = await fetch(GasSheetUrl,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    throw new Error('Email service not implemented yet');
};
