const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifySignUp = require('../middleware/verifySignUp');

// Endpoints básicos: login, refresh, logout, check
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/singup',verifySignUp.verificarMailoUsuarioduplicado, authController.singUp);
router.get('/check', authController.checkAuthStatus);

module.exports = router;
