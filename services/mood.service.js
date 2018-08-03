const ctx = require('../contexts/sqlite.context');

const save = async (date, json) => {
  let query = `INSERT INTO Tracking values (null, ${ date }, '${ json }');`;
  return await ctx.runQuery(query);
};

const list = async (date, json) => {
  let query = `select * from Tracking`;
  return await ctx.get(query);
};

module.exports = { save, list };