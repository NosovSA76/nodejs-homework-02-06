const express = require('express');
const ctrl = require('../../controllers/auth/index');
const { validateBody, authenticate, upload } = require('../../middlewares/index');
const { schemas } = require('../../models/users');
const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;