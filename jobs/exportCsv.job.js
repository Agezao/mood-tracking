const config = require('../config');
const fs = require('fs');
const MoodBusiness = require('../business/mood.business');
//
const moodBusiness = new MoodBusiness();
//

const run = async () => {
  let data = await moodBusiness.exportCsv();
  fs.writeFileSync(config.outputCsv, data);
  console.log(data);
  return data;
};

module.exports = { run };