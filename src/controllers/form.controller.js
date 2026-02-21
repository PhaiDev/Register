import { sendEmail } from '../services/mail.service.js';
import { generatePDF } from '../services/pdf.service.js';
import https from 'https'; // Use native https for streaming proxy

export const submitForm = async (req, res, next) => {
    try {
        const formData = req.body;

        req.session.isSubmitted = true;

        const pdfResult = await generatePDF(formData);
        const fileID = pdfResult?.fileID || pdfResult;

        // --- Security Upgrade: Store permitted fileID in session to enforce one-time download ---
        req.session.permittedDownloadFile = fileID;
        // Optionally save explicitly since connect-redis doesn't sync synchronously
        await new Promise((resolve) => req.session.save(resolve));

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

/**
 * Secure Backend Proxy for One-time PDF Download
 * Prevents direct URL sharing and enforces download limits.
 */
export const downloadPDFProxy = async (req, res, next) => {
    try {
        const requestedFileID = req.params.fileID;

        // 1. Authorization check: Ensure session exists and has permission for THIS specific file
        if (!req.session.isSubmitted || req.session.permittedDownloadFile !== requestedFileID) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized or download link has expired (files can only be downloaded once)."
            });
        }

        // 2. Fetch from Google Docs securely on backend
        const pdfUrl = `https://docs.google.com/presentation/d/${requestedFileID}/export/pdf`;

        // 3. Clear permission immediately to enforce ONLY ONCE
        req.session.permittedDownloadFile = null;
        await new Promise((resolve) => req.session.save(resolve));

        // 4. Stream response to client
        https.get(pdfUrl, (pdfResponse) => {
            // Check for redirects from Google
            const redirectUrl = pdfResponse.headers.location;
            const targetUrl = redirectUrl ? redirectUrl : pdfUrl;

            // Initiate final fetch if redirected, else use stream
            if (redirectUrl) {
                https.get(targetUrl, (finalResponse) => {
                    if (finalResponse.statusCode !== 200) {
                        return res.status(500).send("Error generating PDF from Google.");
                    }
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename="Application_${requestedFileID}.pdf"`);
                    finalResponse.pipe(res);
                }).on('error', (e) => next(e));
            } else {
                if (pdfResponse.statusCode !== 200) {
                    return res.status(500).send("Error generating PDF from Google.");
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="Application_${requestedFileID}.pdf"`);
                pdfResponse.pipe(res);
            }
        }).on('error', (e) => next(e));

    } catch (error) {
        next(error);
    }
};