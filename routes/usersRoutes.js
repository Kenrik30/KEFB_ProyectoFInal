const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

//Rutas para usuarios comunes
router.post('/register', userController.register);
router.post('/login', userController.login);

//Rutas para administradores
router.get('/', auth, checkRole('ADMIN_ROLE'), userController.getUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', auth,checkRole('ADMIN_ROLE'), userController.createUser);
router.put('/:id', auth,checkRole('ADMIN_ROLE'), userController.updateUser);
router.put('/:id/change-password', auth, userController.changePasswordUser);



module.exports = router;