const config = require('../config');
const CameraBusiness = require('../business/camera.business'); // CameraBusiness for webcam (should have same interface)
//const CameraBusiness = require('./business/raspistill.business'); // RaspistillBusiness for raspiberry cam (should have same interface)
const RekognitionBusiness = require('../business/rekognition.business');
const moodService = require('../services/mood.service');
//
const captureBusiness = new CameraBusiness();
const rekognitionBusiness = new RekognitionBusiness();
//

const run = async () => {
  console.log(config.spacer);
  
  // Capturing the image
  let pictureName = new Date().getTime() + '.jpg';
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

module.exports = { run };