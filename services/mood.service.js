const ctx = require('../contexts/sqlite.context');

const save = async (date, json) => {
  let query = `INSERT INTO Tracking values (null, ${ date }, '${ json }');`;
  console.log(query);
  return await ctx.runQuery(query);
};

module.exports = { save };