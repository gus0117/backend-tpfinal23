const mongoose = require('mongoose');
const { Schema } = mongoose;

const EjercicioSchema = new Schema({
    nombreEjercicio: { type: String, required: true },
})
module.exports = mongoose.models.Ejercicio || mongoose.model('Ejercicio', EjercicioSchema)