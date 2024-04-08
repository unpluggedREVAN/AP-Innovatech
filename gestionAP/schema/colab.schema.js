const zod = require('zod');
const z = zod.z;

const colabRegisterSchema = z.object({
    nombreCompleto : z.string({
        required_error : 'Nombre completo es requerido'
    }),
    cedula : z.string({
        required_error : 'Cedula es requerido'
    }),
    correoElectronico : z.string({
        required_error : 'Email es requerido'
    }).email({
        message : 'Email invalido'
    }).refine((email) => {
        const domain = email.split('@')[1];
        return domain === "estudiantec.cr"
    },{
        message : "El correo debe tener el dominio de 'estudiantec.cr'"
    }),
    departamentoTrabajo : z.string({
        required_error : 'Departamento necesario'
    }),
    telefono : z.string({
        required_error : 'Telefono es requerido'
    }),
    contrasena : z.string({
        required_error : 'Contraseña es requerida'
    }).min(8, {
        message : 'La contraseña debe tener como minimo 8 caracteres'
    })
});

module.exports = colabRegisterSchema