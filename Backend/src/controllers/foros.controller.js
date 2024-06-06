import Foro from '../models/Foro.model.js'

export const createForo = async (req, res) => {
    try{
        const foro = new Foro(req.body)

        await foro.save();

        return res.status(201).send({message : "Foro creado", data : foro})
    } catch(err) {
        console.log(err);
        return res.status(500).send({message : err.message})
    }
}

export const editForo = async (req, res) => {
    try{
        const foroEdited = await Foro.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!foroEdited){
            return res.status(404).send({message : "Foro no encontrado"})
        }
        return res.status(200).send({message : "Foro editado", data : foroEdited})
    } catch(err) {
        console.log(err)
        return res.status(500).send({message : err.message})
    }
}

export const infoAllForo = async (req, res) => {
    try{
        const foros = await Foro.find({}).populate('mensajes')

        return res.status(200).send({data : foros })
    } catch(err){
        console.log(err)
        return res.status(500).send({message : err.message})
    }
}

export const infoForo = async (req, res) => {
    try{
        const foro = await Foro.findById(req.params.id).populate('mensajes')

        if(!foro){
            return res.status(404).send({message : "Foro no encontrado"})
        }

        return res.status(200).send({message : "Foro encontrado", data : foro})
    } catch(err){
        console.log(err)
        return res.status(500).send({message : err.message})
    }
}