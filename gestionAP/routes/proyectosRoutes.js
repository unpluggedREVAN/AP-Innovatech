const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');
const authRequired = require('../middlewares/validateToken')
const Tarea = require('../models/Tarea'); // Modelo de tarea

// Endpoint para crear un nuevo proyecto
router.post('/postproyectos', authRequired, async (req, res) => {
    try {
        const dataResponsable = {responsable : req.user.id};
        const bodyRequest = req.body
        const dataProject = {...bodyRequest, ...dataResponsable};
        console.log(dataProject);
        const proyecto = new Proyecto(dataProject);
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

//Endpoint para agregar una tarea - PATCH
router.patch('/patchTaskProyecto/:idProject/:idTarea', async (req, res) => {
    try{
        const projectFound = await Proyecto.findById(req.params.idProject);
        if(!projectFound) return res.status(404).send({ message: "Proyecto no encontrado" });
        const tareasProject = [...projectFound.tareas, req.params.idTarea]
        const proyectoUpdate = await Proyecto.findByIdAndUpdate(req.params.idProject, {tareas : tareasProject}, {new : true, runValidators : true},);
        return proyectoUpdate.tareas;
    } catch (error) {
        console.log(error);
    }
})

// Endpoint para obtener todos los proyectos
router.get('/getproyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.find({}).populate('tareas');
        res.json(proyectos);
    } catch (error) {
        res.status(500).JSON({message : error.message});
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


// Endpoint para obtener todas las tareas de un proyecto específico
router.get('/:idProyecto/tareas', async (req, res) => {
    try {
        const idProyecto = req.params.idProyecto;
        // Primero, encuentra el proyecto por su ID para asegurarse de que exista
        const proyecto = await Proyecto.findById(idProyecto);
        if (!proyecto) {
            return res.status(404).send({ message: "Proyecto no encontrado." });
        }

        // Luego, utiliza los IDs de las tareas almacenados en el proyecto para obtener las tareas
        const tareas = await Tarea.find({ '_id': { $in: proyecto.tareas } });

        res.status(200).send(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener las tareas del proyecto", error: error.message });
    }
});

module.exports = router;
