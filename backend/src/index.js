import express from "express";
import tasksRouter from "./routes/tasksRouters.js";
import connectDB from "./config/db.js";
import dns from "dns";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import cors from "cors";
import path from "path";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 8008;
const __dirname = path.resolve();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use("/api/tasks", tasksRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
