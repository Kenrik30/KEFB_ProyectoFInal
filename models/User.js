const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'],unique: [true, 'El email ya existe'] },
    nUsuario: { type: String, required: [true, 'El usuario es obligatorio'], 
        unique: true,
        minlength: [3, 'El usuario debe tener al menos 3 caracteres'], 
        maxlength: [25, 'El usuario no puede superar los 25 caracteres'], 
        match: [/^[A-Za-z0-9]+$/, 'El usuario solo puede contener letras y números'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    rol: { 
        type: String, 
       required: [true, 'El rol es obligatorio'],
        enum: {
        values: ['ADMIN_ROLE', 'EDITOR_ROLE', 'COLABORADOR_ROLE','LECTOR_ROLE'],
        message: '{VALUE} no es un rol válido' // Mensaje de error personalizado
    },
    default: 'LECTOR_ROLE' },
    status: { 
        type: String, 
        required: true,
        required: [true, 'El estado es obligatorio'],
        enum: {
                values: ['active', 'inactive'],
              message: '{VALUE} no es un estado válido'
       },
       default: 'active'
     },
});

module.exports = mongoose.model('User', userSchema);