//import { sendToGAS } from '../services/gas.service.js';
import { sendEmail } from '../services/mail.service.js';
import { generatePDF } from '../services/pdf.service.js';

export const submitForm = async (req, res, next) => {
    try {
        const formData = req.body;
        console.log("REQ BODY = ", formData);
        // Process form data
        // Example: Send to Google Apps Script
        // await sendToGAS(formData);

        // Example: Send email notification
        // await sendEmail(formData);

        // Example: Generate PDF
        const fileID = await generatePDF(formData);
        console.log(fileID);
        res.status(200).json({
            success: true,
            message: 'Form submitted successfully',
            data: formData,
            fileID: fileID
        });
    } catch (error) {
        next(error);
    }

};