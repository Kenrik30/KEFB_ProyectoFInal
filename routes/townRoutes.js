const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const parkController = require('../controllers/parkController');    

//Rutas publicas para consulta de parques
router.get('/', parkController.getParks);
router.get('/:id', parkController.getParkById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), parkController.createPark);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), parkController.updatePark);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), parkController.deletePark);    

module.exports = router;