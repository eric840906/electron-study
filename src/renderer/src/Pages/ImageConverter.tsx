import { useEffect, useState } from 'react';
import FileInput from '../components/FileInput';
import { Divider, Typography, Collapse } from 'antd';
import ImageFormatForm from '../components/ImageFormatForm';
import constants from 'main/constants';
export default () => {
  const acceptType = 'image';
  const [file, setFile] = useState<File>();
  const [outputType, setOutputType] = useState('.png');
  const [formatterOption, setFormatterOption] = useState({});
  const onFileChange = (newFile: any) => {
    if (!newFile || !newFile.length) {
      setFile(undefined);
    } else {
      console.log(newFile[0].originFileObj);
      setFile(newFile[0].originFileObj);
    }
  };
  const onTypeChange = (newValue: string) => {
    setOutputType(newValue);
  };
  useEffect(() => {
    setFormatterOption((prevOption) => {
      return { ...prevOption, outputType };
    });
  }, [outputType]);
  const sendFilePath = () => {
    if (!file) return;
    console.log(file);
    console.log(formatterOption);
    const serilizedOption = JSON.stringify(formatterOption);
    window.electron.ipcRenderer.send(
      constants.event_keys.GET_INPUT_IMAGE,
      file.path,
      serilizedOption
    );
    setFile(undefined);
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
            onTypeChange={onTypeChange}
            defaultType={outputType}
          />
        </Panel>
      </Collapse>
      <Divider></Divider>
      <FileInput
        accept={`${acceptType}/*`}
        onFileChange={onFileChange}
        sendFilePath={sendFilePath}
      />
    </>
  );
};
