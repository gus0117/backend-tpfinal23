const Ejercicio = require('../models/ejercicio')

const ejercicioCtrl = {};

ejercicioCtrl.getEjercicios = async (req, res) => {
    var ejercicio = await Ejercicio.find();
    res.json(ejercicio);
}

ejercicioCtrl.getEjercicioId = async (req, res) => {
    try {
        const ejercicio = await Ejercicio.findById(req.params.id);
        if (!ejercicio) {
            return res.status(404).json({
                status: '0',
                msg: 'Ejercicio no encontrado'
            });
        }
        res.json(ejercicio);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

ejercicioCtrl.createEjercicio = async (req, res) => {

    var ejercicio = new Ejercicio(req.body);
    try {
        await ejercicio.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Ejercicio guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

ejercicioCtrl.editEjercicio = async (req, res) => {
    const vejercicio = new Ejercicio(req.body);
    try {
        await Ejercicio.updateOne({ _id: req.body._id }, vejercicio);
        res.json({
            'status': '1',
            'msg': 'Ejercicio updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ejercicioCtrl.deleteEjercicio = async (req, res) => {
    try {
        await Ejercicio.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ejercicio removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = ejercicioCtrl;