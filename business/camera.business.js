const config = require('../config');
const execa = require('execa');

class CameraBusiness {
  
  constructor() { }

  async snap(pictureName) {
    return await execa('bin/ffmpeg.exe -f dshow -i video="Integrated Camera" -vframes 1 ' + ('photos/' + pictureName));
  }
}

module.exports = CameraBusiness;
