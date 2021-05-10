const express = require("express");
const accountsRouter = require("./accounts/accounts-router");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/accounts", accountsRouter);

module.exports = server;
