const mongoose = require ('mongoose');

const departmentSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    minlength: [3, 'El nombre del departamento debe tener al menos 3 caracteres'],
    trim: true,
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
    }
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es necesaria'],
    minlength: [10, 'Haz una descripción un poco más larga, al menos 10 caracteres'],
    maxlength: [250, 'La descripción no puede exceder los 500 caracteres'],
    trim: true
  }
});

  module.exports = mongoose.model('Department', departmentSchema);