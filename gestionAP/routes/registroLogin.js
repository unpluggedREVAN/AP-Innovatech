const express = require('express');
const bcrypt = require('bcrypt');
const Colaborador = require('../models/Colaborador'); // Asegúrate de ajustar la ruta al modelo
const router = express.Router();
const validateModel = require('../middlewares/validator.middleware')
const colabRegisterSchema = require('../schema/colab.schema')
const createAccessToken = require('../libs/jwt')

// Endpoint para el registro de un nuevo colaborador
router.post('/register', validateModel(colabRegisterSchema) ,validateModel(colabRegisterSchema) ,async (req, res) => {
    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

        // Crear un nuevo colaborador con la contraseña hasheada
        const colaborador = new Colaborador({
            ...req.body,
            contrasena: hashedPassword // Almacenamos el hash en lugar de la contraseña en texto plano
        });

        await colaborador.save();
        return  res.status(201).send({ message: "Colaborador registrado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            error: error.message
        });
    }
});

// Endpoint para login
router.post('/login', async (req, res) => {
    try {
        // Buscar al colaborador por correo electrónico
        const colaborador = await Colaborador.findOne({ correoElectronico: req.body.correoElectronico });

        if (colaborador && await bcrypt.compare(req.body.contrasena, colaborador.contrasena)) {
            const token = await createAccessToken({id : colaborador._id})
            res.cookie('token', token)
            // La comparación de contraseñas fue exitosa
            res.send({ message: "Inicio de sesión exitoso" });
        } else {
            // Autenticación fallida
            res.status(400).send({ message: "Correo electrónico o contraseña incorrectos" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error al intentar iniciar sesión",
            error: error.message
        });
    }
});

router.post('/logout', async (req, res) => {
    res.cookie('token', "", { expires : new Date(0)});
    console.log("Logout")
    return res.send(200);
})

module.exports = router;
