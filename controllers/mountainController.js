const Mountain = require('../models/Mountain');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.createMountain = async (req, res) => {
    try {
        const { titulo, fecha, descripcion, departamento } = req.body;
        const newMountain = new Mountain({ titulo, fecha, descripcion, departamento, usuario: req.user.id });
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

    exports.getMountainById = async (req, res) => {
        try {
            const { id } = req.params;
            const mountain = await Mountain.findById(id);
            if (!mountain) return res.status(404).json({ msg: 'Montaña no encontrada' });
            res.json(mountain);
        } catch (error) {
            res.status(500).json({ msg: 'Error interno del servidor' });
        }   
    };

    exports.updateMountain = async (req, res) => {
        try {
            const updateMountain = await Mountain.findByIdAndUpdate(req.params.id, req.body, { new: false });
            res.json(updateMountain);
        } catch (error) {
            // 1. Manejar errores de validación (required, enum, match)
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ errors });
            }
            // 2. Manejar errores de duplicado (unique)
            if (error.code === 11000) {
                return res.status(400).json({ msg: 'La montaña ya existe' });
            }
            // 3. Manejar cualquier otro error
            res.status(500).json({ msg: 'Error interno del servidor' });
        }  };

    exports.deleteMountain = async (req, res) => {
        try {
            await Mountain.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Montaña eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ msg: 'Error interno del servidor' });
         }
     };