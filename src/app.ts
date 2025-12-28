import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes";

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.get("/handshake", (req, res) => {
  res.status(200).json({ status: "ok", message: "Handshake successful" });
});

app.use("/api", routes);

// Error Handler
app.use(errorHandler);

export default app;
