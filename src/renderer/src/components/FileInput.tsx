import { Button, Input } from 'antd';
const FileInput: React.FC<{
  onFileChange: any;
  sendFilePath: any;
  accept: string;
}> = ({ onFileChange, sendFilePath, accept }) => {
  return (
    <>
      <Input
        type="file"
        name=""
        id=""
        accept={`${accept}`}
        onChange={(e) => e.target.files && onFileChange(e.target.files[0])}
      />
      <Button className="button-convert" onClick={() => sendFilePath()}>
        開始轉檔
      </Button>
    </>
  );
};

export default FileInput;
