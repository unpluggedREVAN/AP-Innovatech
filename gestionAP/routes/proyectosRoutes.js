const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// Endpoint para crear un nuevo proyecto
router.post('/postproyectos', async (req, res) => {
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
router.get('/getproyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.find({});
        res.send(proyectos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para obtener un proyecto por ID
router.get('/getproyectosid/:id', async (req, res) => {
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
router.patch('/patchproyectos/:id', async (req, res) => {
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
router.delete('/deleteproyectos/:id', async (req, res) => {
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


// Endpoint para asignar un colaborador a un proyecto
router.patch('/:proyectoId/asignarColaborador', async (req, res) => {
    try {
        const { colaboradorId } = req.body; // Asegúrate de enviar el ID del colaborador en el cuerpo de la solicitud
        
        // Opción A: Actualizar el proyecto para incluir el colaborador
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(
            req.params.proyectoId,
            { $push: { colaboradores: colaboradorId } },
            { new: true, runValidators: true }
        );
        
        // Opción B: Actualizar el colaborador para incluir el proyecto (como mostrado anteriormente)
        // Esta opción sería similar al ejemplo anterior, pero ubicada en este archivo.

        if (!proyectoActualizado) {
            return res.status(404).send({ message: "Proyecto no encontrado" });
        }
        
        res.send(proyectoActualizado);
    } catch (error) {
        console.error(error);
        res.status(400).send({
            message: "Error al asignar el colaborador al proyecto",
            error: error.message
        });
    }
});
module.exports = router;
