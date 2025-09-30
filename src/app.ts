import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import serviceRoutes from "./routes/service.routes";

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", serviceRoutes);

export default app;

