import { sendToGAS } from '../services/gas.service.js';
import { sendEmail } from '../services/mail.service.js';
import { generatePDF } from '../services/pdf.service.js';

export const submitForm = async (req, res, next) => {
    try {
        const formData = req.body;
        console.log("REQ BODY = " , formData);
        const result = await sendToGAS(formData);

        // Process form data
        // Example: Send to Google Apps Script
        // await sendToGAS(formData);

        // Example: Send email notification
        // await sendEmail(formData);

        // Example: Generate PDF
        // await generatePDF(formData);

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully',
            data: formData
        });
    } catch (error) {
        next(error);
    }
};