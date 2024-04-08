const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Endpoint para crear una nueva tarea
router.post('/posttareas', async (req, res) => {
    try {
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(201).send(tarea);
    } catch (error) {
        console.error(error); // Para ver el error en la consola del servidor
        res.status(400).send({
            message: "Error al crear la tarea",
            error: error.message // Proporciona el mensaje de error
        });
    }
});

// Endpoint para obtener todas las tareas
router.get('/gettareas', async (req, res) => {
    try {
        const tareas = await Tarea.find({});
        res.send(tareas);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para obtener una tarea por ID
router.get('/tareas/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }
        res.send(tarea);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener la tarea",
            error: error.message
        });
    }
});

// Endpoint para actualizar una tarea por ID
router.patch('/patchtareas/:id', async (req, res) => {
    /*
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombreTarea', 'descripcion', 'estado', 'fechaInicio', 'fechaFin', 'responsable']; // Ajusta esto según tu modelo
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: "Actualizaciones no válidas!" });
    }
    */
    try {
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true });
        if (!tarea) {
            return res.status(404).send({message : "Tarea no encontrada"});
        }
        res.send(tarea);
    } catch (error) {
        console.log("Backend error:" + error);
        res.status(400).send({
            message : "Error al actualizar la tarea",
            error : error.message
        });
    }
});

// Endpoint para eliminar una tarea por ID
router.delete('/deletetareas/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }
        res.send({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar la tarea",
            error: error.message
        });
    }
});

module.exports = router;
