const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res) => {
  mysql.query(
    "SELECT id, nome, marca, preco FROM produto",
    (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({
          mensagem: "Erro ao consultar os produtos.",
        });
      }

      return res.status(200).json({
        produtos: resultado,
      });
    }
  );
});

router.post("/", (req, res) => {
  const { nome, marca, preco } = req.body || {};

  if (
    typeof nome !== "string" ||
    nome.trim() === "" ||
    typeof marca !== "string" ||
    marca.trim() === "" ||
    typeof preco !== "number" ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    preco > 99999999.99
  ) {
    return res.status(400).json({
      mensagem: "Informe nome, marca e preco numérico entre 0 e 99999999.99.",
    });
  }

  mysql.query(
    "INSERT INTO produto (nome, marca, preco) VALUES (?, ?, ?)",
    [nome.trim(), marca.trim(), preco],
    (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({
          mensagem: "Erro ao cadastrar o produto.",
        });
      }

      return res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        produto: {
          id: resultado.insertId,
          nome: nome.trim(),
          marca: marca.trim(),
          preco,
        },
      });
    }
  );
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "Informe um ID inteiro positivo.",
    });
  }

  mysql.query(
    "SELECT id, nome, marca, preco FROM produto WHERE id = ?",
    [id],
    (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({
          mensagem: "Erro ao consultar o produto.",
        });
      }

      if (resultado.length === 0) {
        return res.status(404).json({
          mensagem: "Produto não encontrado.",
        });
      }

      return res.status(200).json({
        produto: resultado[0],
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, marca, preco } = req.body || {};

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "Informe um ID inteiro positivo.",
    });
  }

  if (
    typeof nome !== "string" ||
    nome.trim() === "" ||
    typeof marca !== "string" ||
    marca.trim() === "" ||
    typeof preco !== "number" ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    preco > 99999999.99
  ) {
    return res.status(400).json({
      mensagem: "Informe nome, marca e preco numérico entre 0 e 99999999.99.",
    });
  }

  mysql.query(
    "UPDATE produto SET nome = ?, marca = ?, preco = ? WHERE id = ?",
    [nome.trim(), marca.trim(), preco, id],
    (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({
          mensagem: "Erro ao atualizar o produto.",
        });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensagem: "Produto não encontrado.",
        });
      }

      return res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        produto: {
          id,
          nome: nome.trim(),
          marca: marca.trim(),
          preco,
        },
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "Informe um ID inteiro positivo.",
    });
  }

  mysql.query("DELETE FROM produto WHERE id = ?", [id], (erro, resultado) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({
        mensagem: "Erro ao excluir o produto.",
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado.",
      });
    }

    return res.status(200).json({
      mensagem: "Produto excluído com sucesso!",
      id,
    });
  });
});

module.exports = router;
