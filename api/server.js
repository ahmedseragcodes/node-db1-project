//IMPORTS
const express = require("express");
const accountsRouter = require("../api/accounts/accounts-router");
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());
server.use("/api/accounts", accountsRouter );

//CATCH ALL ENDPOINT
server.get("/", (req, res)=>{
    res.send(
        "<h2>Arrivals</h2>"
    )
})

module.exports = server;
