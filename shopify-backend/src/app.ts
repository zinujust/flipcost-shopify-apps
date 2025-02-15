import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/icaps", router);

export default app;
