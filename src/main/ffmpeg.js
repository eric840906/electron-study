const fs = require('fs').promises;
const path = require('path')
const outputPath = path.join(__dirname, '..', '..', 'output');
//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');
// //Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static').replace(
    'app.asar',
    'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
    'app.asar',
    'app.asar.unpacked'
);
// //tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
// const command = ffmpeg()
// console.log(command)
const checkFolder = async(directory) => {
  try {
    await fs.stat(outputPath)
    console.log(`${outputPath} already exists`);
  } catch (err) {
      if (err.code === 'ENOENT') {
          await fs.mkdir(outputPath);
          console.log(`${outputPath} created`);
      } else {
          throw err;
      }
  }
}
export const convertVideo = async (event, filePath) => {
  checkFolder()
  const { name } = path.parse(filePath)
  // console.log(ffmpegPath)
  // console.log(ffprobePath)
  // console.log(filePath)
  // console.log(outputPath)
  ffmpeg(filePath)
  .videoCodec('libx264')
  .audioCodec('libmp3lame')
  .size('320x240')
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('progress', function({ percent }) {
    console.log(`Processing: ${percent ? percent : 0} % done`);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .save(`${outputPath}\\${name}_compressed.mp4`);

}



