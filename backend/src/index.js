import express from "express";
import tasksRouter from "./routes/tasksRouters.js";
import connectDB from "./config/db.js";
import dns from "dns";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import cors from "cors";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 8008;

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
