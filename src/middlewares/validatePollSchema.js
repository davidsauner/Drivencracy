import { authPoll } from "../Model/PollSchema.js";

export function validatePoll(req, res, next){
    const poll =  req.body
    console.log(req.body)
    const {error} = authPoll.validate(poll, {abortEarly : false});
    if (error) {
        const errors = error.details.map((detail)=> detail.message)
        return res.status(422).send((errors))
    }

    res.locals.poll = poll
    next()
}