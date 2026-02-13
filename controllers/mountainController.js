const Mountain = require('../models/Mountain');
exports.createMountain = async (req, res) => {
    try {
        const { titulo, fecha, descripcion, departamento } = req.body;
        const newMountain = new Mountain({ titulo, fecha, descripcion, departamento, usuario: req.user._id });
        await newMountain.save();

        res.status(201).json({ msg: 'Publicación de montaña creada exitosamente' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        //2. Manejar errores de duplicado (unique)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La montaña ya existe' });
        }
        //3. Manejar cualquier otro error
        res.status(500).json({ msg: 'Error interno del servidor' });
    }};

exports.getMountains = async (req, res) => {
    try {
        const { titulo, descripcion } = req.query;
        let query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };  
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }};  