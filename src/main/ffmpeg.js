import constants from './constants';
const fs = require('fs').promises;
const path = require('path');
const outputPath = path.join(__dirname, '..', '..', 'output');
//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');
// //Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');
// //tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const checkFolder = async (directory) => {
  try {
    await fs.stat(outputPath);
    console.log(`${outputPath} already exists`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(outputPath);
      console.log(`${outputPath} created`);
    } else {
      throw err;
    }
  }
};

const stderrHandler = (info, VideoDuration) => {
  let progressMatch = info.match(/time=(\d+:\d+:\d+.\d+)/);
  let durationMatch = info.match(/Duration: (\d+:\d+:\d+.\d+)/);
  if (durationMatch) {
    let parts = durationMatch[1].split(':');
    VideoDuration.value =
      parseInt(parts[0]) * 3600 +
      parseInt(parts[1]) * 60 +
      parseFloat(parts[2]);
  }
  if (progressMatch) {
    let parts = progressMatch[1].split(':');
    let totalSeconds =
      parseInt(parts[0]) * 3600 +
      parseInt(parts[1]) * 60 +
      parseFloat(parts[2]);
    let percent = (totalSeconds / VideoDuration.value) * 100;
    console.log(`Processing: ${percent.toFixed(2)} % done`);
    return percent.toFixed(2);
  }
};

export const convertVideo = async (event, ...args) => {
  const config = args[1];
  const filePath = args[0];
  const { fps, bitRate, size } = JSON.parse(config);
  const { name } = path.parse(filePath);
  const fullOutput = path.join(outputPath, `${name}.mp4`);
  const duration = { value: undefined };
  console.log({ name, fps, bitRate, size });
  checkFolder();
  ffmpeg(filePath)
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .videoBitrate(bitRate)
    .fps(fps)
    .size(size)
    .on('error', function (err) {
      console.log('An error occurred: ' + err.message);
      event.reply('error', err.message);
    })
    .on('stderr', (info) =>
      event.reply(
        constants.event_keys.CONVERSION_PROGRESS,
        stderrHandler(info, duration)
      )
    )
    .on('end', function () {
      console.log('Processing finished !');
      event.reply(constants.event_keys.CONVERSION_PROGRESS, 100);
    })
    .save(fullOutput);
};
export const convertImage = async (event, ...args) => {
  const config = args[1];
  const filePath = args[0];
  const { outputType } = JSON.parse(config);
  const { name } = path.parse(filePath);
  let duration = undefined;
  console.log(name, outputType);
  checkFolder();
  ffmpeg(filePath)
    .on(constants.event_keys.CONVERSION_PROGRESS, function ({ percent }) {
      console.log(`Processing: ${percent ? percent : 0} % done`);
    })
    .on('end', function () {
      console.log('Processing finished !');
      event.reply('image complete', `${outputPath}\\${name}${outputType}`);
    })
    .save(`${outputPath}\\${name}${outputType}`);
};

const convertImagePromise = async (inputPath, outputPath) => {
  return new Promise((res, rej) => {
    ffmpeg(inputPath)
      .on('end', () => {
        res();
      })
      .on('error', (error) => {
        rej(error);
      })
      .save(outputPath);
  });
};

export const convertMultiImages = async (event, ...args) => {
  const config = args[1];
  const fileArr = JSON.parse(args[0]);
  const { outputType } = JSON.parse(config);
  const imageCount = fileArr.length;
  let processCount = 0;
  checkFolder();
  fileArr.forEach(async (file) => {
    const fullOutput = path.join(
      outputPath,
      `${file.name.split('.')[0]}${outputType}`
    );
    try {
      await convertImagePromise(file.path, fullOutput);
      console.log(`${file.name} complete`);
      processCount++;
      console.log(`${processCount}/${imageCount} processed`);
      const progress = (processCount / imageCount) * 100;
      if (+progress.toFixed(2) >= 100) {
        event.reply(constants.event_keys.CONVERSION_PROGRESS, 100);
      } else {
        event.reply(
          constants.event_keys.CONVERSION_PROGRESS,
          progress.toFixed(2)
        );
      }
      // console.log(`${progress.toFixed(2)}%`)
    } catch (error) {
      console.log(error.message);
    }
    // ffmpeg(file.path).on('end', () => {
    //   processCount++
    //   console.log(`${processCount}/${imageCount} processed`)
    //   const progress = (processCount/imageCount)*100
    //   console.log(`${progress.toFixed(2)}%`)
    // }).save(fullOutput)
  });
  // const input = (inputFiles) => inputFiles.map((inputFile) => {
  //   const name = inputFile.name.split('.')[0]
  //   const filePath = inputFile.path
  //   const fullOutput = path.join(outputPath, `${name}${outputType}`)
  //   return ffmpeg()
  // .addInput(filePath)
  // .on('error', function(err) {
  //   console.log('An error occurred: ' + err.message);
  //   // event.reply('image start', ffmpegPath)
  // })
  // .on('progress', function({ percent }) {
  //   console.log(`Processing: ${percent ? percent : 0} % done`);
  // })
  // .on('progress', function(info) {
  //   console.log(info);
  // })
  // .on('stderr', (info) => console.log(info))
  // .on('end', function() {
  //   console.log('Processing finished !');
  //   // event.reply('image complete', `${outputPath}\\${name}${outputType}`)
  // })
  // .output(fullOutput)
  // })
  // const ffpmegProcess = input(filePath)
  // try {
  //   Promise.all(ffpmegProcess.forEach((item,i) =>{
  //     console.log(i)
  //     console.log(item)
  //     item.run()
  //   }))
  // } catch (error) {
  //   console.log(error.message)
  // }
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
};
