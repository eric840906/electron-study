import { Form, Select, Slider } from 'antd';
import React from 'react';
import constants from 'main/constants';

type SizeType = Parameters<typeof Form>[0]['size'];

const ImageFormatForm: React.FC<{
  onRateChange: (value: number) => void;
  onTypeChange: (value: string) => void;
  defaultType: string;
  defaultrate: number;
}> = ({ onRateChange, onTypeChange, defaultType, defaultrate }) => {
  const { imageFormatArr } = constants.formats;
  const optionGenerator = (optionArray: string[] | number[]) =>
    optionArray.map((item) => (
      <Select.Option key={item} value={`.${item}`}>
        {item}
      </Select.Option>
    ));
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
      <Form.Item label="輸出格式">
        <Select onChange={onTypeChange} defaultValue={defaultType}>
          {optionGenerator(imageFormatArr)}
        </Select>
      </Form.Item>
      {/* <Form.Item label="壓縮程度">
        <Slider
          min={1}
          max={80}
          onChange={onRateChange}
          value={typeof defaultrate === 'number' ? defaultrate : 0}
        ></Slider>
      </Form.Item> */}
    </Form>
  );
};

export default ImageFormatForm;
