const config = require('../config');
const sqlite3 = require('sqlite3').verbose();

let db;

const constructor = async () => {
  db = new sqlite3.Database(config["db-path"], setup);
  return await db;
};

const setup = async () => {
  return await db.run("CREATE TABLE IF NOT EXISTS Tracking (Id INTEGER PRIMARY KEY AUTOINCREMENT, Date INT, Json TEXT)");
};

const isReady = () => {
  return db.open;
}

const runQuery = async (query) => {
  return await db.run(query);
};

const get = (query) => {
  return new Promise((resolve, reject) => {
    try{
      return db.all(query, (err, data) => {
        resolve(data);
      });
    } 
    catch(ex) {
      reject(ex);
    }
  });
};

module.exports = { constructor, setup, isReady, runQuery, get };