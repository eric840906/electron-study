import { Button } from 'antd';
import constant from 'main/constants';

export default () => {
  return (
    <>
      <Button
        onClick={() =>
          window.electron.ipcRenderer.send(constant.event_keys.TEST, 123)
        }
      >
        test button
      </Button>
    </>
  );
};
