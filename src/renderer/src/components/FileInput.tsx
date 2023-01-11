import { Button, Input } from 'antd';
import { useState } from 'react';
// import { dialog, ipcRenderer } from 'electron';
// import { Dialog } from 'electron';
// import { ipcRenderer } from 'electron/renderer';
import event_keys from 'main/event_keys';
const FileInput: React.FC<{ accept: string }> = ({ accept }) => {
  const [file, setFile] = useState<FileList>();
  const sendFilePath = (file: any) => {
    console.log(file);
    window.electron.ipcRenderer.send(event_keys.GET_INPUT_PATH, file.path);
    // dialog.showOpenDialog({ properties: ['openFile'] }, function (file: any) {
    //   console.log(file);
    //   ipcRenderer.send(event_keys.GET_INPUT_PATH, file[0]);
    // });
  };
  return (
    <>
      <Input
        type="file"
        name=""
        id=""
        accept={`${accept}`}
        onChange={(e) => e.target.files && setFile(e.target.files)}
      />
      <Button
        className="button-convert"
        onClick={() => file && sendFilePath(file[0])}
      >
        開始轉檔
      </Button>
    </>
  );
};

export default FileInput;
