import constants from 'main/constants';
import { useEffect, useState } from 'react';
import { Progress, message } from 'antd';
import useNotice from '../hooks/useNotice';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [noticeInput, contextHolder] = useNotice();
  useEffect(() => {
    window.electron.ipcRenderer.on(
      constants.event_keys.CONVERSION_PROGRESS,
      (arg: any) => {
        if (arg) setProgress(arg);
      }
    );
  }, []);
  useEffect(() => {
    if (progress === 100) {
      noticeInput('success', '轉檔完成');
      setTimeout(() => setProgress(0), 1000);
    }
  }, [progress]);
  return (
    <>
      {contextHolder}
      <Progress
        percent={progress}
        status={progress === 100 ? 'success' : 'normal'}
      />
    </>
  );
};

export default ProgressBar;
