import { useState } from 'react';
import FileInput from '../components/FileInput';
import { Divider, Typography, Collapse } from 'antd';
import ImageFormatForm from '../components/ImageFormatForm';
export default () => {
  let formatterOption = {};
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
  const formatOptions = {};
  const { Title } = Typography;
  const { Panel } = Collapse;
  return (
    <>
      <Title level={3}>影片轉檔</Title>
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
      <FileInput accept="image/*" />
    </>
  );
};
