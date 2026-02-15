const Park = require('../models/Park');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Para crear publicaciones de lugar
exports.createPark = async (req, res) => {
    try {
        const { titulo,fecha,descripcion, departamento } = req.body;
        const newPark = new Park({ titulo, fecha, descripcion, departamento, usuario: req.user.id });
        await newPark.save();

        res.status(201).json({ msg: 'Publicacion de Parque creada exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }   
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El parque ya existe' });
        }
        // 3. Manejar errores desconocidos
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.getParks = async (req, res) => {
    try {
        const {titulo, descripcion} = req.query;
        let query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };   

        const parks = await Park.find(query);
        res.json(parks);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.getParkById = async (req, res) => {
    try {
        const { id } = req.params;  
        const park = await Park.findById(id);
        if (!park) return res.status(404).json({ msg: 'Parque no encontrado' });
        res.json(park);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }   
};

exports.updatePark = async (req, res) => {
    try {
        const updatePark = await Park.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.json(updatePark);
    }
    catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                ok :false,
                errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El parque ya existe' });
        }
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.deletePark = async (req, res) => {
    try {
        await Park.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Publicacion de Parque eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
