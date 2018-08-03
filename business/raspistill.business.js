const config = require('../config');
const Raspistill = require('node-raspistill').Raspistill;

class RaspistillBusiness {
  
  constructor() {
	  
    this.opts = {
	  verticalFlip: true,
	  width: 1600,
	  height: 900,
	  time: 1000
    };
    
    this.camera = new Raspistill(this.opts);
  }

  async snap(pictureName) {
	return this.camera.takePhoto(pictureName);
  }
}

module.exports = RaspistillBusiness;
