const express = require('express');
const router = express.Router();
const Foro = require('../models/Foro'); // Asegúrate de que la ruta al modelo es correcta

// Endpoint para crear un nuevo foro
router.post('/foros', async (req, res) => {
    try {
        const foro = new Foro(req.body);
        await foro.save();
        res.status(201).send(foro);
    } catch (error) {
        console.error(error); // Para ver el error en la consola del servidor
        res.status(400).send({
            message: "Error al crear el foro",
            error: error.message // Proporciona el mensaje de error
        });
    }
});

// Endpoint para obtener todos los foros
router.get('/foros', async (req, res) => {
    try {
        const foros = await Foro.find({});
        res.send(foros);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para actualizar un foro por ID
router.patch('/foros/:id', async (req, res) => {
    try {
        const foro = await Foro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!foro) {
            return res.status(404).send({ message: "Foro no encontrado" });
        }
        res.send(foro);
    } catch (error) {
        res.status(400).send({
            message: "Error al actualizar el foro",
            error: error.message
        });
    }
});

// Endpoint para eliminar un foro por ID
router.delete('/foros/:id', async (req, res) => {
    try {
        const foro = await Foro.findByIdAndDelete(req.params.id);
        if (!foro) {
            return res.status(404).send({ message: "Foro no encontrado" });
        }
        res.send({ message: "Foro eliminado exitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el foro",
            error: error.message
        });
    }
});

module.exports = router;
