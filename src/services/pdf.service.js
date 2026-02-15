import { config } from '../config/env.js';

/**
 * Send data to Google Apps Script
 * @param {Object} data - Data to send
 * @returns {Promise<Object>}
 */
const GenPdfUrl = "https://script.google.com/macros/s/AKfycbzHV9cceRrhEcBHAycj7MdXih4TKV1M5moUeoic79xGkISqQrUMMwM1Dj1vos_X7IuLnA/exec"
export const generatePDF = async (data) => {
    // Implementation for sending data to Google Apps Script
    // Example: fetch to GAS web app URL
   const res = await fetch(GenPdfUrl,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
   });

   return res.json();
};
