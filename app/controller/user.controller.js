const Base = require('../controller/base.controller.js')
const db = require("../model");
const Op = db.Sequelize.Op;
const Tb = db.users;
var md5 = require('md5');
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

class UserController extends Base {

  // Save USer in the database
  static create = (user) => {
    const promise = new Promise((resolve, reject) => {

      Tb.create(user)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao criar o Usuário."));

        });
    });
    return promise;
  }

  static update = (id, user) => {
    const promise = new Promise((resolve, reject) => {

      Tb.update(user, {
        where: { id: id }
      })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao atualizar o Usuário."));

        });
    });
    return promise;
  }

  static delete = (id) => {
    const promise = new Promise((resolve, reject) => {

      Tb.destroy({
        where: { id: id }
      })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao Deletar o Usuário."));

        });
    });
    return promise;
  }


  // Retrieve all from the database.
  static findAll = () => {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'Select id  ' +
        'from tb_user  ',
        {
          type: Tb.sequelize.QueryTypes.SELECT
        }
      ).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao buscar Usuário"));
        });
    });
    return promise;
  }

  // Find a single user with an id
  static findOne = (id) => {
    const promise = new Promise((resolve, reject) => {
      Tb.findByPk(id)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao buscar este Usuário"));
        });

    });
    return promise;
  }

  static getlist(tb_institution_id) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'Select u.id  ' +
        'from tb_user u ' +
        '  inner join tb_institution_has_user ihu ' +
        '  on (u.id = ihu.tb_user_id) ' +
        'where (u.active="S") ' +
        ' and ihu.tb_institution_id =? ',
        {
          replacements: [tb_institution_id],
          type: Tb.sequelize.QueryTypes.SELECT
        }
      ).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao buscar o Usuário"));
        });
    });
    return promise;
  }

  static getUserAuth(email, password) {
    
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'Select u.* ' +
        'from tb_user u ' +
        '  inner join tb_mailing m ' +
        '  on (u.id = m.id) ' +
        'where ( m.email=? ) ' +
        ' and ( u.password=? ) ',
        {
          replacements: [email, password.toUpperCase()],
          type: Tb.sequelize.QueryTypes.SELECT
        }).then(data => {
          console.log(data);
          if (data) { resolve(data) } else { resolve('0') };
        })
        .catch(err => {
          reject(new Error("Algum erro aconteceu ao buscar o Usuário"));
        });
    });
    return promise;
  }

  static generateJWT(data) {
    const promise = new Promise((resolve) => {

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: data.id,
        email: data.email,
        password: data.password        
      }
      var token = jwt.sign({ payload }, process.env.SECRET, {expiresIn: "15d"   });
      //var token = jwt.sign(payload, process.env.SECRET, {algorithm: 'HS256', expiresIn: "15d"});

      resolve({ auth: true, token: token });
    });
    return promise;
  }

  static authorization(token){
    const promise = new Promise((resolve,reject) => {    
      try {
        console.log(token);
        resolve(jwt.verify(token, process.env.SECRET, {algorithm: 'HS256'}));
      } catch {
        reject("Bad Token");
      }      
    });
    return promise;
  }

}

module.exports = UserController; 