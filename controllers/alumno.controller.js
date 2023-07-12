const Alumno = require('../models/alumno')

const alumnoCtrl = {};

alumnoCtrl.getAlumnos = async (req, res) => {
    var alumno = await Alumno.find().populate('usuario').populate('plan');
    res.json(alumno);
}

alumnoCtrl.getAlumnoId = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) {
            return res.status(404).json({
                status: '0',
                msg: 'Alumno no encontrado'
            });
        }
        res.json(alumno);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

alumnoCtrl.createAlumno = async (req, res) => {

    var alumno = new Alumno(req.body);
    try {
        await alumno.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Alumno guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

alumnoCtrl.editAlumno = async (req, res) => {
    const valumno = new Alumno(req.body);
    try {
        await Alumno.updateOne({ _id: req.body._id }, valumno);
        res.json({
            'status': '1',
            'msg': 'Alumno updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alumnoCtrl.deleteAlumno = async (req, res) => {
    try {
        await Alumno.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Alumno removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = alumnoCtrl;