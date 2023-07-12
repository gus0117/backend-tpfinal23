const mongoose = require('mongoose');
const { Schema } = mongoose;

const PagoSchema = new Schema({
    monto: { type: Number, required: true },
    listaInsumo: [{type: Schema.Types.ObjectId, 
        ref: Insumo, 
        required: true }]

})

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);