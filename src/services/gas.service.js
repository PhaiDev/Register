import { config } from '../config/env.js';

/**
 * Send data to Google Apps Script
 * @param {Object} data - Data to send
 * @returns {Promise<Object>}
 */
const GasPdfUrl = "https://script.google.com/macros/s/AKfycbwDnNs0dscoaW5oaBnEmVN_J5GYDTONFdM9EHY89CSZx3DK-1-w7-zuwVoknrl8jiInWg/exec"
export const sendToGAS = async (data) => {
    // Implementation for sending data to Google Apps Script
    // Example: fetch to GAS web app URL
   const res = await fetch(GasPdfUrl,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
   });

   return res.json();
};
