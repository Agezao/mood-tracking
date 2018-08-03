const config = require('./config');
const CameraBusiness = require('./business/camera.business'); // CameraBusiness for webcam (should have same interface)
//const CameraBusiness = require('./business/raspistill.business'); // RaspistillBusiness for raspiberry cam (should have same interface)
const RekognitionBusiness = require('./business/rekognition.business');
const schedule = require('node-schedule');
const ctx = require('./contexts/sqlite.context');
const moodService = require('./services/mood.service');
//
const spacer = '-----------------------//-----------------------';
ctx.constructor();
//

//Gathering parameters
const cron = config.cron;
let pictureName = "track.jpg";
let help = false;

//
console.log(`Mood tracking starting at cron ${ cron }`);

process.argv.forEach(function (val, index, array) {
  if(val === '--help')
	  help = true;
});

if(help) {
  console.log('Mood tracking infos at github.com/agezao');
  console.log(spacer);
  return;
}

// Starting program
const run = async () => {  
  console.log(spacer);
  let captureBusiness = new CameraBusiness();
  let rekognitionBusiness = new RekognitionBusiness();
  
  // Capturing the image
  pictureName = new Date().getTime() + '.jpg';
  console.log('Snapping picture...');
  let cameraSnap = await captureBusiness.snap(pictureName);
  console.log('Picture saved!');

  try{
	  let response = 'Invalid operation';
	
    // Saving face to rekognition
    console.log('Checking info on rekognition...');
    response = await rekognitionBusiness.MoodTrack(pictureName);
    await moodService.save(pictureName.replace('.jpg', ''), JSON.stringify(response));
    console.log(`${pictureName} tracked at ${new Date()}`);
  }
  catch(ex) {
    console.log(ex);
  }
};
//run();
let job = schedule.scheduleJob(cron, run);