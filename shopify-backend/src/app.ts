import express from "express";
import dotenv from "dotenv";
import router from "./routes/shopifyProductsRoutes";
import cors from "cors";

dotenv.config();
const app = express();

console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

const corsOptions = {
  origin: "https://flipcost-shopify-apps.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type, Authorization, Origin",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/icaps", router);

export default app;
