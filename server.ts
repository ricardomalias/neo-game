import express from "express";
import bodyParser from "body-parser";
import characterRoutes from "./routes/CharacterRoutes.ts";

const app = express();
app.use(bodyParser.json());

app.use("/characters", characterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;