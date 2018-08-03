// Edit this with your info and rename it to just .js
const config = {
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": "us-east-1",
  "db-path": "./db/mood.sqlite3",
  "cron": "*/1 * * * *",
  "spacer": "-----------------------//-----------------------",
  "outputCsv": './output.csv'
}

module.exports = Object.assign({}, config);