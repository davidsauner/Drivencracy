const PORT = 5000;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import PollRoutes from "./routers/PollRoutes.js"
import ChoiceRoutes from "./routers/ChoiceRoutes.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(PollRoutes)
app.use(ChoiceRoutes)

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
