import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type, Authorization, Origin",
  credentials: true,
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/icaps", router);

export default app;
