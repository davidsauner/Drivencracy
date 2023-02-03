import joi from  'joi';

export const authPoll = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().allow(null, "")

})