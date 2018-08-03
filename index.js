const config = require('./config');
const schedule = require('node-schedule');
const ctx = require('./contexts/sqlite.context');
//
ctx.constructor();
//

//Setting parameters
let help = false;
let scheduled = true;
let exportCsv = false;

//
process.argv.forEach(function (val, index, array) {
  if(val === '--export') {
    exportCsv = true;
    scheduled = false;
  }
  
  if(val === '--help')
	  help = true;
});

if(help) {
  console.log('Mood tracking infos at github.com/agezao');
  console.log(config.spacer);
  console.log('Options: ');
  console.log('--export');
  console.log('Prepare a .csv with all the json data to ease the analysis process');
  console.log(config.spacer);
  console.log('--help');
  console.log('Show this message');
  return;
}

// Starting program
const start = async () => {
  if(!ctx.isReady()) return setTimeout(start, 10);

  let mainJob = exportCsv ? require('./jobs/exportCsv.job') 
                          : require('./jobs/track.job');

  if(scheduled) {
    console.log(`Mood tracking starting at cron ${ config.cron }`);
    let runner = schedule.scheduleJob(config.cron, mainJob.run);
  }
  else
    mainJob.run();
}
start();
