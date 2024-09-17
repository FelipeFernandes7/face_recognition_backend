import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { router } from "./routes";

export const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () =>
  console.log(`server is Open 🔥 http://localhost:${process.env.PORT}`),
);
