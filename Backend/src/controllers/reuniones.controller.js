import Meeting from '../models/Reunion.model.js'

export const createMeeting = async (req, res) => {
    try{
        //Crear nueva reunion
        const reunion = new Meeting(req.body);

        //Guardar la reunion
        await reunion.save();

        //Dar respuesta del backend
        return res.status(201).send({message : "Reunion creada exitosamente", data : reunion})
    } catch(err){
        return res.status(500).send({message : err.message})
    }
}

export const infoMeeting = async (req, res) => {
    try{
        //Buscar la reunion
        const meetingFound = await Meeting.findById(req.params.id).populate('proyecto').populate('colaboradoresSolicitados');

        //Definir si existe
        if(!meetingFound){
            return res.status(404).send({message : "No existe reunión"})
        }
        return res.status(200).send({message : "Reunion encontrada", data : meetingFound})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const infoAllMeetings = async (req, res) => {
    try{
        const reuniones = await Meeting.find({proyecto : req.params.idProject})

        return res.status(200).send({data : reuniones})
    } catch(err) {
        return res.status(500).send({message : err.message})
    } 
}

export const editMeeting = async (req, res) => {
    try{
        //Buscar y editar
        const meetingUpdated = await Meeting.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!meetingUpdated) {
            return res.status(404).send({message : "Meeting no encontrado"})
        }
        return res.status(200).send({message : "Meeting editada", data : meetingUpdated})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const deleteMeeting = async (req, res) => {
    try{
        const meetingDeleted = await Meeting.findByIdAndDelete(req.params.id)

        if(!meetingDeleted) {
            return res.status(404).send({message : "Meeting no encontrada"})
        }
        return res.status(200).send({message : "Meeting eliminada"})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}