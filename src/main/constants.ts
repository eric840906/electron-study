export default {
  formats: {
    sizeArr: [
      '1920x1080',
      '1280x720',
      '960x540',
      '854x480',
      '640x360',
      '426x240',
      '320x180'
    ],
    fpsArr: [8, 12, 15, 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 120],
    imageFormatArr: ['webp', 'png', 'jpg']
  },
  event_keys: {
    GET_INPUT_VIDEO: 'GET_INPUT_VIDEO',
    GET_INPUT_IMAGE: 'GET_INPUT_IMAGE',
    CONVERSION_PROGRESS: 'CONVERSION_PROGRESS',
    SHOW_DIRECTORY_DIALOG: 'SHOW_DIRECTORY_DIALOG',
    PATH_SELECTED: 'PATH_SELECTED',
    PATH_CONFIRN: 'PATH_CONFIRM'
  }
}
