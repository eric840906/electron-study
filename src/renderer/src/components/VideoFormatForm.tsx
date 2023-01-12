import { Form, InputNumber, Select, Button } from 'antd';
import constants from 'main/constants';
import React from 'react';

const VideoFormatForm: React.FC<{
  onfpsChange: any;
  onBitRateChange: any;
  onSizeChange: any;
  defaultFps: string;
  defaultBitRate: number;
  defaultSize: string;
}> = ({
  onfpsChange,
  onBitRateChange,
  onSizeChange,
  defaultFps,
  defaultBitRate,
  defaultSize,
}) => {
  const { sizeArr, fpsArr } = constants.formats;
  const optionGenerator = (optionArray: string[] | number[]) =>
    optionArray.map((item) => (
      <Select.Option key={item} value={`${item}`}>
        {item}
      </Select.Option>
    ));
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        size: defaultSize,
        fps: defaultFps,
        bitRate: defaultBitRate,
      }}
    >
      <Form.Item name="size" label="影片尺寸">
        <Select onChange={onSizeChange}>{optionGenerator(sizeArr)}</Select>
      </Form.Item>
      <Form.Item name="fps" label="fps">
        <Select onChange={onfpsChange}>{optionGenerator(fpsArr)}</Select>
      </Form.Item>
      <Form.Item label="bitrate">
        <Form.Item name="bitRate" noStyle>
          <InputNumber
            min={800}
            max={4000}
            onChange={(val) => onBitRateChange(val)}
          />
        </Form.Item>
        <span className="ant-form-text" style={{ marginLeft: 8 }}>
          K
        </span>
      </Form.Item>
    </Form>
  );
};

export default VideoFormatForm;
