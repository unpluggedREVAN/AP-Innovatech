const express = require('express');
const router = express.Router();
const Colaborador = require('../models/Colaborador'); // Asegúrate de que la ruta sea correcta
const authRequired = require('../middlewares/validateToken')

// Endpoint para crear un nuevo colaborador
router.post('/postcolaboradores', async (req, res) => {
    try {
        const colaborador = new Colaborador(req.body);
        await colaborador.save();
        res.status(201).send(colaborador);
    } catch (error) {
        console.error(error); // Para ver el error en la consola del servidor
        res.status(400).send({
            message: "Error al crear el colaborador",
            error: error.message // Proporciona el mensaje de error
        });
    }
});

// Endpoint para obtener todos los colaboradores
router.get('/getcolaboradores', async (req, res) => {
    console.log("Finding Colaboradores")
    try {
        const colaboradores = await Colaborador.find({});
        console.log("Colaboradores" + colaboradores)
        res.send(colaboradores);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
});

// Endpoint para obtener la información de un colaborador
router.get('/colab', authRequired, async (req, res) => {
    const userFound = await Colaborador.findById(req.user.id)
    if(!userFound) return res.status(400).json({ message : "Colaborador no encotrado" });
    return res.json({
        nombreCompleto : userFound.nombreCompleto,
        cedula : userFound.cedula,
        correoElectronico : userFound.correoElectronico,
        departamentoTrabajo : userFound.departamentoTrabajo,
        telefono : userFound.telefono
    })
})

// Endpoint para actualizar un colaborador por ID
router.patch('/patchcolaboradores/:id', async (req, res) => {
    try {
        const colaborador = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!colaborador) {
            return res.status(404).send({ message: "Colaborador no encontrado" });
        }
        res.send(colaborador);
    } catch (error) {
        res.status(400).send({
            message: "Error al actualizar el colaborador",
            error: error.message
        });
    }
});

// Endpoint para eliminar un colaborador por ID
router.delete('/deletecolaboradores/:id', async (req, res) => {
    try {
        const colaborador = await Colaborador.findByIdAndDelete(req.params.id);
        if (!colaborador) {
            return res.status(404).send({ message: "Colaborador no encontrado" });
        }
        res.send({ message: "Colaborador eliminado exitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el colaborador",
            error: error.message
        });
    }
});

module.exports = router;
