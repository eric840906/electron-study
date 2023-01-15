const fs = require('fs').promises;
const path = require('path')
const outputPath = path.join(__dirname, '..', '..', 'output');
//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');
// //Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static')
const ffprobePath = require('ffprobe-static')
// //tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
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
export const convertVideo = async (event, ...args) => {
  const config = args[1]
  const filePath = args[0]
  const { fps, bitRate, size } = (JSON.parse(config))
  const { name } = path.parse(filePath)
  console.log({name, fps, bitRate, size})
  checkFolder()
  ffmpeg(filePath)
  .videoCodec('libx264')
  .audioCodec('libmp3lame')
  .videoBitrate(bitRate)
  .fps(fps)
  .size(size)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('progress', function({ percent }) {
    console.log(`Processing: ${percent ? percent : 0} % done`);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .save(`${outputPath}\\${name}.mp4`);
}
export const convertImage = async (event, ...args) => {
  const config = args[1]
  const filePath = args[0]
  const { outputType } = (JSON.parse(config))
  const { name } = path.parse(filePath)
  console.log(name, outputType)
  checkFolder()
  ffmpeg(filePath)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
    // event.reply('image start', ffmpegPath)
  })
  .on('progress', function({ percent }) {
    console.log(`Processing: ${percent ? percent : 0} % done`);
  })
  .on('end', function() {
    console.log('Processing finished !');
    event.reply('image complete', `${outputPath}\\${name}${outputType}`)
  })
  .save(`${outputPath}\\${name}${outputType}`);
}

const covertionReducer = (config, filePath) => {
  const { outputType } = (JSON.parse(config))
  const input = filePath.reduce((result, input) => {
    const { name } = path.parse(input)
    return result.addInput(input)
  }, ffmpeg())
  const output = filePath.reduce((result, input) => {
    return save(`${outputPath}\\${input}${outputType}`)
  })
  
}

export const convertMultiImages = async (event, ...args) => {
  const config = args[1]
  const filePath = JSON.parse(args[0])
  const { outputType } = JSON.parse(config)
  console.log(filePath)
  const input = (inputFiles) => inputFiles.map((inputFile) => {
    const name = inputFile.name.split('.')[0]
    const path = inputFile.path
    return ffmpeg()
    .addInput(path)
    // .on('error', function(err) {
    //   console.log('An error occurred: ' + err.message);
    //   // event.reply('image start', ffmpegPath)
    // })
    .on('progress', function({ percent }) {
      console.log(`Processing: ${percent ? percent : 0} % done`);
    })
    // .on('end', function() {
    //   console.log('Processing finished !');
    //   // event.reply('image complete', `${outputPath}\\${name}${outputType}`)
    // })
    .output(`${outputPath}\\${name}${outputType}`)
  })
  const ffpmegProcess = input(filePath)
  try {
    Promise.all(ffpmegProcess.forEach((item,i) =>{
      console.log(i)
      console.log(item)
      item.run()
    }))
  } catch (error) {
    console.log(error.message)
  }
  // Promise.allSettled(ffpmegProcess.forEach(item =>item.run())).then((results) => {
  //   results.forEach((result,index) => {
  //     if (result.status === 'fulfilled') {
  //       console.log(`image${index+1} converted successfully!`);
  //     } else {
  //       console.log(`image${index+1} failed: `, result.reason);
  //     }
  //   });
  // })
  // .catch(err => {
  //   console.error(err);
  // });
}



