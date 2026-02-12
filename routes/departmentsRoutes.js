const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const departmentController = require('../controllers/departmentController');

//Rutas publicas para consulta de departamentos
router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartmentById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), departmentController.createDepartment);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), departmentController.updateDepartment);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), departmentController.deleteDepartment);


module.exports = router;