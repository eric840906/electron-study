import constants from 'main/constants';
import { Button, Upload } from 'antd';
import { ReloadOutlined, FileAddOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  converting,
  convertDone,
  selectConvertState,
} from '../store/convertingSlice';
const { Dragger } = Upload;
const FileInput: React.FC<{
  onFileChange: any;
  sendFilePath: any;
  accept: string;
}> = ({ onFileChange, sendFilePath, accept }) => {
  const isConverting = useSelector(selectConvertState);
  const dispatch = useDispatch();
  useEffect(() => {
    window.electron.ipcRenderer.on(
      constants.event_keys.CONVERSION_PROGRESS,
      (arg) => {
        if (arg === 100) {
          dispatch(convertDone());
        } else {
          dispatch(converting());
        }
      }
    );
  }, []);
  const multiple = accept.includes('image') ? true : false
  const maxCount = multiple ? 100 : 1
  const props: UploadProps = {
    name: 'file',
    accept: `${accept}`,
    multiple,
    maxCount,
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
        disabled={isConverting}
        className="button-convert"
        onClick={sendFilePath}
        style={{ marginTop: 20 }}
        icon={<ReloadOutlined />}
      >
        開始轉檔
      </Button>
    </div>
  );
};

export default FileInput;
