const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const beachController = require('../controllers/beachController');

//Rutas publicas para consulta de playas
router.get('/', beachController.getBeaches);
router.get('/:id', beachController.getBeachById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), beachController.createBeach);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), beachController.updateBeach);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), beachController.deleteBeach);

module.exports = router;