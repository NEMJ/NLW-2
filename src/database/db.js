const Database = require('sqlite-async')

function execute(db) { // a função 'then' retornará um banco de dados;; '.exec' Funcionalidade do Objeto que permite injetar códigos sql no arquivo

  // Criar as Tabelas do banco de Dados, e depois de criá-las retorna ao 'then' o banco completo
  return db.exec(` 
    CREATE TABLE IF NOT EXISTS proffys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      whatsapp TEXT,
      bio TEXT
    );
      
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject INTEGER,
      cost TEXT,
      proffy_id INTEGER
    );
        
    CREATE TABLE IF NOT EXISTS class_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER,
      weekday INTEGER,
      time_from INTEGER,
      time_to INTEGER
    );
  `) 
}


// O 'module.exports' é um objeto que, pela função 'exports', guardará os dados fornecidos; E o 'node' saberá quem estaremos chamando quando usarmos o 'require' em outro arquivo juntamente com o nome deste aqui.

module.exports = Database.open(__dirname + '/database.sqlite').then(execute).then() 
// Se o arquivo existir o JS abre, se não ele mesmo cria

/* Como o JavaScript executa linha a linha do código sem parar, mesmo se um processo ainda estiver sendo executado, outros comandos serão primeiro. Por isso temos que usar o 'then'. Que quer dizer que depois do processo que leva essa funcionalidade for executado, o que estiver entre os parênteses será executado somente quando o primeiro for completado */