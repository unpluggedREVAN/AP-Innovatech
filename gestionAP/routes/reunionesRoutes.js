const express = require('express');
const router = express.Router();
const Reunion = require('../models/Reunion'); 

// Definición de los endpoints

// Endpoint para crear una nueva reunión
router.post('/reuniones', async (req, res) => {
    try {
        const reunion = new Reunion(req.body);
        await reunion.save();
        res.status(201).send(reunion);
    } catch (error) {
        console.error(error); // Para ver el error en la consola del servidor
        res.status(400).send({
            message: "Error al crear la reunión",
            error: error.message // Proporciona el mensaje de error
        });
    }
});


// Endpoint para obtener todas las reuniones
router.get('/reuniones', async (req, res) => {
    try {
        const reuniones = await Reunion.find({});
        res.send(reuniones);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Editar reunión
router.patch('/reuniones/:id', async (req, res) => {
    try {
        const reunion = await Reunion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!reunion) {
            return res.status(404).send({ message: "Reunión no encontrada" });
        }
        res.send(reunion);
    } catch (error) {
        res.status(400).send({
            message: "Error al actualizar la reunión",
            error: error.message
        });
    }
});


router.delete('/reuniones/:id', async (req, res) => {
    try {
        const reunion = await Reunion.findByIdAndDelete(req.params.id);
        if (!reunion) {
            return res.status(404).send({ message: "Reunión no encontrada" });
        }
        res.send({ message: "Reunión eliminada exitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar la reunión",
            error: error.message
        });
    }
});

module.exports = router;

