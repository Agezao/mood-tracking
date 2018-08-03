const config = require('../config');
const AWS = require('aws-sdk');
const fs = require('fs');

class RekognitionBusiness {

  constructor() {
    this.rekognition = new AWS.Rekognition({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region
    });
  }

  async MoodTrack(imagePath) {
    let image = fs.readFileSync('./photos/' + imagePath, 'base64');
    const buffer = new Buffer(image, 'base64');

    return this.rekognition.detectFaces({
        Image: {
          Bytes: buffer
        },
        Attributes: [
          "ALL"
        ]
      }).promise();
  }
}

module.exports = RekognitionBusiness;
