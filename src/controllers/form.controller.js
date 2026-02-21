//import { sendToGAS } from '../services/gas.service.js';
import { sendEmail } from '../services/mail.service.js';
import { generatePDF } from '../services/pdf.service.js';

export const submitForm = async (req, res, next) => {
    try {
        const formData = req.body;
        // console.log("REQ BODY = ", formData); // ลดการ log ขยะตอนส่งฟอร์ม

        req.session.isSubmitted = true;

        const pdfResult = await generatePDF(formData);
        // console.log("PDF Result:", pdfResult);

        const fileID = pdfResult?.fileID || pdfResult;
        // console.log("FileID:", fileID);
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