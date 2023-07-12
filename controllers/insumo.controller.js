const Insumo = require('../models/insumo');
const insumoCtrl = {};

insumoCtrl.getInsumo = async (req, res) => {
    var insumos = await Insumo.find();
    res.json(insumos);
};

insumoCtrl.getInsumoId = async (req, res) => {
    try {
        const insumo = await Insumo.findById(req.params.id);
        if (!insumo) {
            return res.status(404).json({
                status: '0',
                msg: 'Insumo no encontrado'
            });
        }
        res.json(insumo);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

insumoCtrl.createInsumo = async (req, res) => {
    console.log(req.body);
    var insumo = new Insumo(req.body);
    try {
        await insumo.save();
        res.json({
            'status': '1',
            'msg': 'Insumo guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

insumoCtrl.deleteInsumo = async (req, res) => {
    try {
        await Insumo.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Insumo eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

insumoCtrl.editInsumo = async (req, res) => {
    try {
        const insumo = await Insumo.findByIdAndUpdate(req.params.id, req.body);
        if (!insumo) {
            return res.status(404).json({
                status: '0',
                msg: 'Insumo no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Insumo actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

insumoCtrl.modificarInsumos = async (req, res) => {
    try {
        const insumos = req.body; // Array de insumos recibido desde el frontend

        // Iterar sobre el array de insumos y actualizar el stock en la base de datos
        for (let insumo of insumos) {
            await Insumo.findByIdAndUpdate(insumo._id, { 'stock': insumo.stock - 1 });
        }

        res.json({ message: 'Stock de insumos actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = insumoCtrl;
