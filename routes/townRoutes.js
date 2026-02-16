const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const parkController = require('../controllers/parkController');    

//Rutas publicas para consulta de parques
router.get('/', townController.getParks);
router.get('/:id', townController.getParkById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), townController.createPark);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), townController.updatePark);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), townController.deletePark);    

module.exports = router;