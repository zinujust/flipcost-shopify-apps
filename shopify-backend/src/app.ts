import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/csv", router);

export default app;
