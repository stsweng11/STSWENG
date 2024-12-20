import express from 'express';
import controller from './../../controllers/controller.js';
const router = express.Router();

// Go to home page
router.get('/favicon.ico', controller.getFavicon);
router.get('/', controller.getIndex);

export default router;