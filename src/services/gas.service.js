import { config } from '../config/env.js';

/**
 * Send data to Google Apps Script
 * @param {Object} data - Data to send
 * @returns {Promise<Object>}
 */
export const sendToGAS = async (data) => {
    // Implementation for sending data to Google Apps Script
    // Example: fetch to GAS web app URL
   const res = await fetch(process.env.GAS_API_KEY,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
   });

   return res.json();
};
