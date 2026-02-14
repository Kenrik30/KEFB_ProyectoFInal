const Volcano = require('../models/Volcano');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Para crear publicaciones de lugar
exports.createVolcano = async (req, res) => {
    try {
        const { titulo,fecha,descripcion, departamento } = req.body;
        const newVolcano = new Volcano({ titulo, fecha, descripcion, departamento, usuario: req.user.id });
        await newVolcano.save();
        res.status(201).json({ message: 'Volcán creado exitosamente', volcano: newVolcano });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }   
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El volcán ya existe' });
        }
        // 3. Manejar errores desconocidos
        res.status(500).json({ message: 'Error interno del servidor' });
    }   
};

exports.getVolcanos = async (req, res) => {
    try {
        const {titulo, descripcion} = req.query;
        let query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };

        const volcanoes = await Volcano.find(query);
        res.json(volcanoes);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }  
 };

exports.getVolcanoById = async (req, res) => {
    try {
        const { id } = req.params;  
        const volcano = await Volcano.findById(id);
        if (!volcano) return res.status(404).json({ message: 'Volcán no encontrado' });
        res.json(volcano);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateVolcano = async (req, res) => {
    try {
        const updateVolcano = await Volcano.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.json(updateVolcano);
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }   
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El volcán ya existe' });
        }
        // 3. Manejar errores desconocidos
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteVolcano = async (req, res) => {
    try {
        await Volcano.findByIdAndDelete(req.params.id);
        res.json({ message: 'Volcán eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }   
};