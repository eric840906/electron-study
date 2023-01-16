import { useState } from 'react';
import { Progress } from 'antd';
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0)
  window.electron.ipcRenderer.on('progress', (arg:any) => {
    if(arg)setProgress(arg)
  })
  return (
  <>
    <Progress percent={progress} status={progress === 100? "success": "normal"} />
  </>
  )
}

export default ProgressBar;