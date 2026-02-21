import express from 'express';
import { submitForm, downloadPDFProxy } from '../controllers/form.controller.js';
import { validateRegistrationForm } from '../validators/form.validator.js';

const router = express.Router();

router.post('/submit', validateRegistrationForm, submitForm);
router.get('/download/:fileID', downloadPDFProxy);

export default router;
