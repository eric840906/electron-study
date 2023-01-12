import { useState } from 'react';
import FileInput from '../components/FileInput';
import { Divider, Typography, Collapse } from 'antd';
import ImageFormatForm from '../components/ImageFormatForm';
import event_keys from 'main/constants';
export default () => {
  let formatterOption = {};
  const [file, setFile] = useState<FileList>();
  const sendFilePath = () => {
    console.log(file);
    // if (file.type.includes('video')) {
    //   window.electron.ipcRenderer.send(event_keys.GET_INPUT_VIDEO, file.path);
    // }

    // dialog.showOpenDialog({ properties: ['openFile'] }, function (file: any) {
    //   console.log(file);
    //   ipcRenderer.send(event_keys.GET_INPUT_PATH, file[0]);
    // });
  };
  const [compressValue, setCompressValue] = useState(1);
  const [outputType, setOutputType] = useState('.png');
  const onRateChange = (newValue: number) => {
    setCompressValue(newValue);
    formatterOption = { ...formatterOption, compressValue, outputType };
    console.log(formatterOption);
  };
  const onTypeChange = (newValue: string) => {
    setOutputType(newValue);
    formatterOption = { ...formatterOption, compressValue, outputType };
    console.log(formatterOption);
  };
  const onCollapseChange = (key: string | string[]) => {
    console.log(key);
  };
  const { Title } = Typography;
  const { Panel } = Collapse;
  return (
    <>
      <Title level={3}>圖片轉檔</Title>
      <Divider></Divider>
      <Collapse defaultActiveKey={['1']} onChange={onCollapseChange}>
        <Panel header="轉檔設定" key="1">
          <ImageFormatForm
            onRateChange={onRateChange}
            onTypeChange={onTypeChange}
            defaultType={outputType}
            defaultrate={compressValue}
          />
        </Panel>
      </Collapse>
      <Divider></Divider>
      <FileInput
        accept="image/*"
        onFileChange={setFile}
        sendFilePath={sendFilePath}
      />
    </>
  );
};
