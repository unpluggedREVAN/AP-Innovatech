const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto'); // Asegúrate de ajustar la ruta al modelo correctamente

// Endpoint para crear un nuevo proyecto
router.post('/proyectos', async (req, res) => {
    try {
        const proyecto = new Proyecto(req.body);
        await proyecto.save();
        res.status(201).send(proyecto);
    } catch (error) {
        console.error(error); // Para ver el error en la consola del servidor
        res.status(400).send({
            message: "Error al crear el proyecto",
            error: error.message // Proporciona el mensaje de error
        });
    }
});

// Endpoint para obtener todos los proyectos
router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.find({});
        res.send(proyectos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para obtener un proyecto por ID
router.get('/proyectos/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto) {
            return res.status(404).send({ message: "Proyecto no encontrado" });
        }
        res.send(proyecto);
    } catch (error) {
        res.status(500).send({
            message: "Error al obtener el proyecto",
            error: error.message
        });
    }
});

// Endpoint para actualizar un proyecto por ID
router.patch('/proyectos/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!proyecto) {
            return res.status(404).send({ message: "Proyecto no encontrado" });
        }
        res.send(proyecto);
    } catch (error) {
        res.status(400).send({
            message: "Error al actualizar el proyecto",
            error: error.message
        });
    }
});

// Endpoint para eliminar un proyecto por ID
router.delete('/proyectos/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
        if (!proyecto) {
            return res.status(404).send({ message: "Proyecto no encontrado" });
        }
        res.send({ message: "Proyecto eliminado exitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el proyecto",
            error: error.message
        });
    }
});

module.exports = router;
