const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const nightController = require('../controllers/nightController');  

//Rutas publicas para consulta de noches
router.get('/', nightController.getNights);
router.get('/:id', nightController.getNightById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), nightController.createNight);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), nightController.updateNight);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), nightController.deleteNight);  

module.exports = router;