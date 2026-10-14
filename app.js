"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const produtoRotas = require("./rotas/produto");
app.use("/produto", produtoRotas);

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API da loja de eletrônicos funcionando!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    mensagem: "Rota inexistente!",
  });
});

app.use((erro, req, res, next) => {
  res.status(erro.status || 500).json({
    mensagem: erro.message || "Erro interno do servidor.",
  });
});

module.exports = app;
