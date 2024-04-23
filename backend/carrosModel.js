const connection = require('./db');

// Função para listar todos os carros
function listarCarros() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM carros', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Função para adicionar um novo carro
function adicionarCarro(carro) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO carros SET ?', carro, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Função para editar um carro existente
function editarCarro(id, novoCarro) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE carros SET ? WHERE id = ?', [novoCarro, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Função para excluir um carro
function excluirCarro(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM carros WHERE id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  listarCarros,
  adicionarCarro,
  editarCarro,
  excluirCarro
};
