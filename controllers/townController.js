const Town = require('../models/Town');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Para crear publicaciones de lugar
exports.createTown = async (req, res) => {
    try {
        const { titulo,fecha,descripcion, departamento } = req.body;
        const newTown = new Town({ titulo, fecha, descripcion, departamento, usuario: req.user.id });
        await newTown.save();

        res.status(201).json({ msg: 'Publicacion Pueblo creado exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El pueblo ya existe' });
        }   
        // 3. Manejar errores desconocidos
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.getTowns = async (req, res) => {
    try {
        const {titulo, descripcion} = req.query;
        let query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };

        const towns = await Town.find(query);
        res.json(towns);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.getTownById = async (req, res) => {
    try {
        const { id } = req.params;
        const town = await Town.findById(id);
        if (!town) return res.status(404).json({ msg: 'Pueblo no encontrado' });
        res.json(town);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.updateTown = async (req, res) => {
    try {
        const updateTown = await Town.findByIdAndUpdate(req.params.id, req.body
, { new: false });
        res.json(updateTown);
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
            return res.status(400).json({ msg: 'El pueblo ya existe' });
        }
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.deleteTown = async (req, res) => {
    try {
        await Town.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Publicacion Pueblo eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};  