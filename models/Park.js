const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    titulo: {
            type: String,
            required: [true, 'El título es obligatorio'],
            minlength: [3, 'El título debe tener al menos 3 caracteres'],
            maxlength: [100, 'El título no puede exceder los 100 caracteres'],
            trim: true,
        },
        fecha: {
            type: Date,
            required: [true, 'La fecha es obligatoria'],
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
            minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
            maxlength: [5000, 'La descripción no puede exceder los 500 caracteres'],
            trim: true,
        },
        departamento: {
            type: String,
            required: [true, 'El departamento es obligatorio'],
             enum: {
          values: [
            'Ahuachapán', 
            'Santa Ana', 
            'Sonsonate', 
            'La Libertad', 
            'Chalatenango', 
            'San Salvador', 
            'Cuscatlán', 
            'La Paz', 
            'Cabañas', 
            'San Vicente', 
            'Usulután', 
            'San Miguel', 
            'Morazán', 
            'La Unión'
          ],
          message: '{VALUE} no es un departamento válido de El Salvador'
        },
    },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        } 
    }, 
    {
        timestamps: true
    });
