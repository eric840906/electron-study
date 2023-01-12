import { Form, Select, Slider } from 'antd';
import React from 'react';
import constants from 'main/constants';

type SizeType = Parameters<typeof Form>[0]['size'];

const ImageFormatForm: React.FC<{
  onTypeChange: (value: string) => void;
  defaultType: string;
}> = ({ onTypeChange, defaultType }) => {
  const { imageFormatArr } = constants.formats;
  const optionGenerator = (optionArray: string[] | number[]) =>
    optionArray.map((item) => (
      <Select.Option key={item} value={`.${item}`}>
        {item}
      </Select.Option>
    ));
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        output: defaultType,
      }}
    >
      <Form.Item name="output" label="輸出格式">
        <Select onChange={onTypeChange}>
          {optionGenerator(imageFormatArr)}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ImageFormatForm;
