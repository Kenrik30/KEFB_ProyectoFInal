const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const mountainController = require('../controllers/mountainController');    

//Rutas publicas para consulta de montañas
router.get('/', mountainController.getMountains);
router.get('/:id', mountainController.getMountainById); 

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), mountainController.createMountain);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), mountainController.updateMountain);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), mountainController.deleteMountain);    

module.exports = router;