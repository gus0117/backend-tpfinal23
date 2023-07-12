const mongoose = require('mongoose');
const cuota = require('./cuota');
const { Schema } = mongoose;

const PagoCuotaSchema = new Schema({
    monto: { type: Number, required: true },
    cuota: {type: Schema.Types.ObjectId, 
        ref: Cuota, 
        required: true }

})

module.exports = mongoose.models.PagoCuota || mongoose.model('PagoCuota', PagoCuotaSchema);