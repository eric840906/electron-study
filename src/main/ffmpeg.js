import constants from './constants';
const fs = require('fs').promises;
const path = require('path');
const configPath = path.join(__dirname, '..', '..', 'config');
// const outputPath = path.join(__dirname, '..', '..', 'output');
let outputPath;
//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');
// //Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');
// //tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
// const checkFolder = async (directory) => {
//   try {
//     await fs.stat(outputPath);
//     console.log(`${outputPath} already exists`);
//     console.log(outputPath)
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       await fs.mkdir(outputPath);
//       console.log(`${outputPath} created`);
//     } else {
//       throw err;
//     }
//   }
// };

const checkFolder = async (directory) => {
  try {
    const config = await fs.readFile(`${configPath}/config.json`);
    outputPath = JSON.parse(config).output;
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(outputPath);
      console.log(`${outputPath} created`);
      outputPath = JSON.parse(config).output;
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
  const duration = { value: undefined };
  console.log({ name, fps, bitRate, size });
  await checkFolder();
  const fullOutput = path.join(outputPath, `${name}.mp4`);
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
  await checkFolder();
  console.log(outputPath)
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
    } catch (error) {
      console.log(error.message);
    }
  });
};
