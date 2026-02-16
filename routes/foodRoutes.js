const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const nightController = require('../controllers/foodController');  

//Rutas publicas para consulta de comidas
router.get('/', foodController.getFoods);
router.get('/:id', foodController.getFoodById);

//Rutas privadas para administradores
router.post('/', auth, checkRole('ADMIN_ROLE'), foodController.createFood);
router.put('/:id', auth, checkRole('ADMIN_ROLE'), foodController.updateFood);
router.delete('/:id', auth, checkRole('ADMIN_ROLE'), foodController.deleteFood);  

module.exports = router;