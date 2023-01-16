import constants from 'main/constants';
import { Button, Input, Typography, Form, message, Upload } from 'antd';
import { ReloadOutlined, FileAddOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
const { Paragraph } = Typography;
const { Dragger } = Upload;
const FileInput: React.FC<{
  onFileChange: any;
  sendFilePath: any;
  accept: string;
}> = ({ onFileChange, sendFilePath, accept }) => {
  const [buttonActive, setButtonActive] = useState(true);
  useEffect(() => {
    window.electron.ipcRenderer.on(
      constants.event_keys.CONVERSION_PROGRESS,
      (arg) => {
        if (arg === 100) {
          setButtonActive(true);
        } else {
          setButtonActive(false);
        }
      }
    );
  }, []);
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
      if (
        e.dataTransfer.files[0].type?.split('/')[0] !== accept.split('/')[0]
      ) {
        alert('wrong file');
        return;
      }
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
        <p className="ant-upload-text">Drag or click to select file</p>
      </Dragger>

      <Button
        disabled={!buttonActive}
        className="button-convert"
        onClick={() => sendFilePath()}
        style={{ marginTop: 20 }}
        icon={<ReloadOutlined />}
      >
        開始轉檔
      </Button>
    </div>
  );
};

export default FileInput;
