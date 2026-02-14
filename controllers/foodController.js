const Food = require('../models/Food');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Creacion de publicaciones del lugar 
exports.createFood = async (req, res) => {
    try {
        const { titulo,fecha,descripcion,departamento } = req.body;
        const newFood = new Food({ titulo, fecha, descripcion,departamento, usuario: req.user.id });
        await newFood.save();

        res.status(201).json({ msg: 'Registro de comida creada exitosamente'});
    } catch (error) {
        //1.Manejar errores de validacion,(required,enum,match)
        if (error.name === 'validationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({errors});
        }
        //2. Manejar errores de base de datos (duplicados,etc)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'La comida y existe'});
        }
        //3. Manejar errores desconocidos
        res.status(500).json({ msg: 'Error interno del servidor'});

    }
};

exports.getFoods = async (req, res) => {
    try {
        const {titulo, descripcion} = req.query;
        let query = {};
        if (titulo) query.titulo = {$regex: titulo, $option: 'i'};
        if (descripcion) query.descripcion = { $regex: descripcion, $option: 'i'};

        const foods = await Food.find(query);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor'});
    }
};

exports.getFoodsById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        if (!food) return res.status(404).json ({ msg: 'Comida no encontrada'});
        res.json(food);
    }
    catch (error){
        res.status(500).json({ msg: 'Error interno del servidor'});
    }
};

exports.updateFood = async (req, res) => {
    try {
        const updateFood = await Food.findByIAndUpadate(req.params.id, req.body, { new: false});
       res.json(updateFood); 
    } catch (error) {
        //1. Manejar errores de validacion(required, enu, match)
        if (error.name ==='validacionError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                ok: false,
                errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                msg: 'La comida ya existe'});
        }
        //3. Manejar errores desconocidos
        res.status(500).json({ msg: 'Error interno de servidor'});
    }
};

exports.deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Comida eliminada correctamente'});
    } catch (error) {
        res.status(500).json({msg: 'Error interno del servidor'});
    }
};

