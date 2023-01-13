import { Button, Input, Typography, Form, message, Upload } from 'antd';
import { ReloadOutlined, FileAddOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import React from 'react';
const { Paragraph } = Typography;
const { Dragger } = Upload;
const FileInput: React.FC<{
  onFileChange: any;
  sendFilePath: any;
  accept: string;
}> = ({ onFileChange, sendFilePath, accept }) => {
  const props: UploadProps = {
    name: 'file',
    accept: `${accept}`,
    multiple: false,
    onChange(info) {
      console.log(info.file, info.fileList);
      onFileChange(info.fileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    beforeUpload() {
      return false;
    },
  };
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <FileAddOutlined />
        </p>
        <p className="ant-upload-text">拖曳或點擊選擇檔案</p>
      </Dragger>
      <Button className="button-convert" onClick={() => sendFilePath()}>
        <ReloadOutlined />
        開始轉檔
      </Button>
    </div>
  );
};

export default FileInput;
