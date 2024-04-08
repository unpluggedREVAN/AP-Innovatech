const validateModel = (model) => (req, res, next) => {
    try{
        model.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({error : error.errors.map(error => error.message)})
    }
}

module.exports = validateModel