import { useEffect, useState } from 'react';
import FileInput from '../components/FileInput';
import { Divider, Typography, Collapse } from 'antd';
import constants from 'main/constants';
import VideoFormatForm from '../components/VideoFormatForm';
export default () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const { Title } = Typography;
  const { Panel } = Collapse;
  const [file, setFile] = useState<File>();
  const [fps, setFps] = useState(24);
  const [bitRate, setBitRate] = useState(1500);
  const [size, setSize] = useState('640x480');
  const [formatterOption, setFormatterOption] = useState({
    fps,
    bitRate,
    size,
  });
  const onfpsChange = (newValue: string) => {
    setFps(+newValue);
  };
  const onbitRateChange = (newValue: number) => {
    setBitRate(() => newValue);
  };
  const onSizeChange = (newValue: string) => {
    setSize(newValue);
  };
  useEffect(() => {
    setFormatterOption((oldOption) => {
      return { ...oldOption, fps, bitRate, size };
    });
  }, [fps, bitRate, size]);
  const sendFilePath = () => {
    if (!file) return;
    console.log(formatterOption);
    // const serilizedOption = JSON.stringify(formatterOption);
    // window.electron.ipcRenderer.send(
    //   constants.event_keys.GET_INPUT_VIDEO,
    //   file.path,
    //   serilizedOption
    // );

    // dialog.showOpenDialog({ properties: ['openFile'] }, function (file: any) {
    //   console.log(file);
    //   ipcRenderer.send(event_keys.GET_INPUT_PATH, file[0]);
    // });
  };
  return (
    <>
      <Title level={3}>影片轉檔</Title>
      <Divider></Divider>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="轉檔設定" key="1">
          <VideoFormatForm
            onfpsChange={onfpsChange}
            onBitRateChange={onbitRateChange}
            onSizeChange={onSizeChange}
            defaultFps={'' + fps}
            defaultBitRate={bitRate}
            defaultSize={size}
          />
        </Panel>
      </Collapse>
      <Divider></Divider>

      <FileInput
        accept="video/*"
        onFileChange={setFile}
        sendFilePath={sendFilePath}
      />
    </>
  );
};
