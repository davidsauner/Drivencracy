import { Router } from "express";
import {  postChoice } from "../controllers/Choice.js";
import { validateChoice } from "../middlewares/validadateChoiceSchema.js";
import { postVote } from "../controllers/Choice.js";

const  router = Router();

router.post('/choice', validateChoice,postChoice)
router.post('/choice/:id/vote', postVote)

export default router