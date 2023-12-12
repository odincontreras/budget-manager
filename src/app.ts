import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.get("/ping", (_, res) => {
  res.send("pong");
});
app.use(errorHandler);

export default app;
