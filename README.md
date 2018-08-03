<h1 align="center" style="border:none;">
Mood-Tracker ☹️🔬😀
</h1>

Mood Tracking using <a href="https://aws.amazon.com/rekognition/" target="_blank">facial reckognition</a> and node-js.

[![Github file size](https://img.shields.io/github/size/webcaetano/craft/build/phaser-craft.min.js.svg)](https://github.com/Agezao/mood-tracking)
[![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)](https://github.com/Agezao/mood-tracking)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Agezao/mood-tracking)

## How it works?
<img src="https://github.com/Agezao/mood-tracking/blob/master/drawings/mood-tracker.jpg?raw=true" width="600" />


## Getting started

### Install Global Dependancies
  * [Node.js](http://nodejs.org)

### Running the project
  * [Download zip](https://github.com/agezao/mood-tracking/archive/master.zip), or clone the repo `git clone https://github.com/Agezao/mood-tracking.git`
  * cd to project folder
  * run `[sudo] npm install` (first time users)
  * edit config with your informations and rename it to `index.js` (instead of `index.example.js`)
  * `npm start`

### Querying data

To later query the data, you can use the [CLI of sqlite](https://www.sqlite.org/cli.html) to search inside the .sqlite3 file.

or

run `npm run export` and it'll generate one .csv with all your sql data in a structured manner.

## License

Do whatever you want. [open-source MIT license](http://opensource.org/licenses/mit-license.php).
