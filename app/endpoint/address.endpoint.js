const { address } = require("../model");
const db = require("../model");
const Query = db.address;

exports.save = (req, res) => {

};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Conteudo não pode ser em branco!"
    });
    return;
  }

  // Create a Tutorial
  const obj = req.body;

  // Save Tutorial in the database
  Query.create(obj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum Erro aconteceu!!"
      });
    });
};

