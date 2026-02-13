const Department = require('../models/Department');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.createDepartment = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newDepartment = new Department({ nombre, descripcion });
        await newDepartment.save();

        res.status(201).json({ msg: 'Departamento creado exitosamente' });
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        // 2. Manejar errores de duplicado (unique)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El departamento ya existe' });
        }
        // 3. Manejar cualquier otro error
        res.status(500).json({ msg: 'Error interno del servidor' });
    }};

exports.getDepartments = async (req, res) => {
    try {
        const {nombre, descripcion} = req.query;
        let query = {};
        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
        if (descripcion) query.descripcion = { $regex: descripcion, $options: 'i' };

        const departments = await Department.find(query);
        res.json(departments);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) return res.status(404).json({ msg: 'Departamento no encontrado' });
        res.json(department);
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }   };

exports.updateDepartment = async (req, res) => {
    try {
        const updateDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: false });
        res.json(updateDepartment);
    } catch (error) {
        // 1. Manejar errores de validación (required, enum, match)
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                ok: false,
                errores });
        }    

        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                errores: ['El departamento ya existe']
            });
            }res.status(500).json({error: error.message}
        );
    }
};
exports.deleteDepartment = async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id); 
        res.json({ msg: 'Departamento eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor' });
    }   
};
