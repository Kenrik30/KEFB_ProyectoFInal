const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const volcanoController = require('../controllers/volcanoController');  

//Rutas publicas para consulta de volcanos
router.get('/', volcanoController.getVolcanos);
router.get('/:id', volcanoController.getVolcanoById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), volcanoController.createVolcano);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), volcanoController.updateVolcano);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), volcanoController.deleteVolcano);  

module.exports = router;