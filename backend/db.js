const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'guilherme',
  password: 'mrtyy3z4',
  database: 'mytcc'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
