const { Router } = require('express');
const authRouter = require("./auth");
const userRouter = require("./user");
const boardRouter = require("./board");
const cardRouter = require("./card");
const columnRouter = require("./column");

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/board", boardRouter);
routes.use("/card", cardRouter);
routes.use("/column", columnRouter);

module.exports = routes;