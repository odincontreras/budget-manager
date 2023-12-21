import "dotenv/config";
import cors from "cors";
import { queryParser } from "express-query-parser";
import express from "express";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  }),
);
app.use(express.json());
app.use(routes);
app.get("/ping", (_, res) => {
  res.send("pong");
});
app.use(errorHandler);

export default app;
