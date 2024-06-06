import Mensaje from '../models/Mensaje.model.js'

export const createMessage = async (req, res) => {
    try{
        const mensaje = new Mensaje(req.body)

        await mensaje.save();

        return res.status(201).send({message : "Mensaje creado", data : mensaje})
    } catch(err) {
        console.log(err);
        return res.status(500).send({message : err.message})
    }
}