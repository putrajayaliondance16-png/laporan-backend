import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reports", reportRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
