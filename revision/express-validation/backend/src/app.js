import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import handleError from "./middleware/error.middleware.js";
import authRouter from "./router/auth.router.js";
import chatRouter from "./router/chat.router.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api/auth", authRouter);

app.use("/api/chats", chatRouter);

app.use(handleError);

export default app;
