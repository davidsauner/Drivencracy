import { authChoice } from "../Model/ChoiceSchema.js";

export function validateChoice(req, res, next){
    const choice =  req.body

    const {error} = authChoice.validate(choice, {abortEarly : false});
    if (error) {
        const errors = error.details.map((detail)=> detail.message)
        return res.status(422).send((errors))
    }

    
    next()
}