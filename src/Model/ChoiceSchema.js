import joi from  'joi';

export const authChoice = joi.object({
    title: joi.string().required(),
    pollId: joi.string().required(),

})