import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";
import cors from "cors";
import { METHODS } from "http";

const corsOptions = {
  origin: "https://flipcost-shopify-apps.vercel.app",
  METHODS: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/icaps", router);

export default app;
