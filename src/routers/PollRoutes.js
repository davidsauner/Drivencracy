import { Router } from "express";
import { pollPost,pollGet } from "../controllers/Poll.js";
import { validatePoll } from "../middlewares/validatePollSchema.js";
import { getChoices,getResult } from "../controllers/Poll.js";

const  router = Router();

router.post('/poll',validatePoll,pollPost)
router.get('/poll',pollGet)
router.get('/poll/:id/choice', getChoices)
router.get('/poll/:id/result', getResult)
export default router