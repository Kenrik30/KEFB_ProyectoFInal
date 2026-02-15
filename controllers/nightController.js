const Night = require('../models/nightModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { watch } = require('../models/Beach');
require('dotenv').config();

//Para crear publicaciones de lugar
exports.createNight = async (req, res) => {
    try {
        const { titulo,fecha,descripcion, departamento } = req.body;
        const newNight = new Night({ titulo, fecha, descripcion, departamento, usuario: req.user.id });
        await newNight.save();
        res.status(201).json({ message: 'Publicación de noche creada exitosamente', night: newNight });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'La publicación de noche ya existe' });
        }
        // 3. Manejar errores desconocidos  
        res.status(500).json({ message: 'Error al crear la publicación de noche', error });
    }
};

exports.getNights = async (req, res) => {
    try {
        const {titulo, descripcion} = req.query;
        let query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };

        const nights = await Night.find(query);
        res.json(nights);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones de noche', error });
    }
};

exports.getNightById = async (req, res) => { 
    try {
        const { id } = req.params;  
        const night = await Night.findById(id);
        if (!night) return res.status(404).json({ message: 'Publicación de noche no encontrada' });
        res.json(night);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la publicación de noche', error });
    }
};

exports.updateNight = async (req, res) => {
    try {
        const updateNight = await Night.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.json(updateNight);
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') { 
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        // 2. Manejar errores de base de datos (duplicados, etc.)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'La publicación de noche ya existe' });
        }
        // 3. Manejar errores desconocidos
        res.status(500).json({ message: 'Error al actualizar la publicación de noche', error });
    }   
};

exports.deleteNight = async (req, res) => {
    try {
        await Night.findByIdAndDelete(req.params.id);
        res.json({ message: 'Publicación de noche eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la publicación de noche', error }); 

    }   
};
