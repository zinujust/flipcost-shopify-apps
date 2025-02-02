import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/icaps", router);

export default app;
