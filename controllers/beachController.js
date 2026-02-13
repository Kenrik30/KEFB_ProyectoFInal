const Beach = require('../models/Beach');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createBeach = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newBeach = new Beach({ nombre, descripcion });
        await newBeach.save();

        res.status(201).json({ msg: 'Playa creada exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La playa ya existe' });
        }
        // 3. Manejar errores desconocidos
        res.status(500).json({ msg: 'Error interno del servidor' });
    };

    exports.getBeaches = async (req, res) => {
        try {
            const {nombre, descripcion} = req.query;
            let query = {};
            if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
            if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };

            const beaches = await Beach.find(query);
            res.json(beaches);
        } catch (error) {
            res.status(500).json({ msg: 'Error interno del servidor' });
        }

    };

    exports.getBeachById = async (req, res) => {
        try {
            const { id } = req.params;  
            const beach = await Beach.findById(id);
            if (!beach) return res.status(404).json({ msg: 'Playa no encontrada' });
            res.json(beach);
        }
        catch (error) {
            res.status(500).json({ msg: 'Error interno del servidor' });
        }};

    exports.updateBeach = async (req, res) => {
        try {
            const updateBeach = await Beach.findByIdAndUpdate(req.params.id, req.body, { new: false });
            res.json(updateBeach);
        } catch (error) {
            // 1. Manejar errores de validación (required, enum, match)
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ 
                    ok :false,
                    errors });
            }
            if (error.code === 11000) {
                return res.status(400).json({
                    ok: false,
                    msg: 'La playa ya existe' });
            }
             // 3. Manejar errores desconocidos
            res.status(500).json({ msg: 'Error interno del servidor' });  
        }
    };
};