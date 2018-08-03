const moodService = require('../services/mood.service');
const config = require('../config');
const jsonexport = require('jsonexport');

//

// Private
const propertyList = (object) => {
  let props = [];
  for(var property in object)
    props.push(property);
  
  return props;
};

const generateHeader = (rawData) => {
  let header = [];
  let ignoreList = ['BoundingBox', 'Landmarks', 'Pose', 'Quality', 'Confidence'];
  let notInheader = (text) => header.indexOf(text) < 0;
  let ignored = (text) => ignoreList.indexOf(text) > -1;

  if(!rawData)
    return header;

  for(var i = 0; i < rawData.length; i++) {
    let row = rawData[i];
    let rowData = JSON.parse(row.Json);
    let faceDetails = rowData.FaceDetails;

    if(notInHeader('Id'))
      header.push('Id');

    if(notInHeader('Date'))
      header.push('Date');

    if(notInHeader('Day'))
      header.push('Day');

    if(notInHeader('Weekday'))
      header.push('Weekday');

    if(notInHeader('Time'))
      header.push('Time');

    if(!faceDetails || (faceDetails && faceDetails.length == 0))
      continue;
    
    for(var property in faceDetails[0]) {
      faceDetails[property]
      // propertyName is what you want
      // you can get the value like this: 
    }
  }
}

const generateRows = async (headers, rawData) => {

}

class MoodBusiness {
  
  constructor() { }

  // Public
  async normalize() {
    let dataset = [];
    let raw = await moodService.list();

    if(raw && raw.length > 0) {
      let header = generateHeader(rawData);
      let rows = generateRows(header, raw);

      dataset.push(header);
      for(var j = 0; j < rows.length; rows++)
        dataset.push(rows[j]);
    }
    
    return dataset;
  }

  async exportCsv() {
    let raw = await moodService.list();
    let cleansed = [];

    const ignoreList = ['BoundingBox', 'Landmarks', 'Pose', 'Quality', 'Confidence'];
    const isIgnored = (text) => ignoreList.indexOf(text) > -1;

    for(var i = 0; i < raw.length; i++) {
      let line = raw[i];
      let json = JSON.parse(line.Json);
      let row = {};
      row.Id = line.Id;
      row.Timestamp = line.Date;
      row.Date = new Date(line.Date).getDate() + '/' + (new Date(line.Date).getMonth() + 1) + '/' + new Date(line.Date).getFullYear();
      row.Weekday = new Date(line.Date).getDay() + 1;
      row.Hour = new Date(line.Date).getHours();
      row.Minute = new Date(line.Date).getMinutes();

      if(json.FaceDetails && json.FaceDetails.length > 0)
        for(var property in json.FaceDetails[0]) {
          if(isIgnored(property))
            continue;

          row[property] = json.FaceDetails[0][property];
        }

      cleansed.push(row);
    }

    let csv = await new Promise((resolve, reject) => {
      jsonexport(cleansed, {rowDelimiter: ';'}, function(err, csv){
          if(err) return reject(err);
          return resolve(csv);
      });
    });

    csv = csv.replace(/\./g, ",");

    return csv;
  }
}

module.exports = MoodBusiness;