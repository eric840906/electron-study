import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { text } from 'stream/consumers';
import constants from 'main/constants';
import { ipcRenderer } from 'electron/renderer';

const ConfigForm: React.FC<{onOpen: any, onCancel: any}> = ({onOpen, onCancel}) => {

  const [outputPath, setOutputPath] = useState('')
  useEffect(() => {
    window.electron.ipcRenderer.on(constants.event_keys.PATH_SELECTED, (args:any) => setOutputPath(args))
  }, [])

  const changePath = () => {
    window.electron.ipcRenderer.send(constants.event_keys.SHOW_DIRECTORY_DIALOG)
  }
  const confirmPath = () => {
    window.electron.ipcRenderer.send(constants.event_keys.PATH_CONFIRN, outputPath)
    onCancel()
  }
  return (
    <Modal
      title="設定"
      open={onOpen}
      onOk={confirmPath}
      // confirmLoading={confirmLoading}
      onCancel={onCancel}
      cancelText="取消"
      okText='確定'
      // okButtonProps={{style: {display:'none'}}}
      cancelButtonProps={{style: {display:'none'}}}
    >
      <div>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        colon={false}
        autoComplete="off"
        layout='inline'
        style={{
          paddingTop:10

        }}
      >
        <Form.Item
          label="輸出路徑"
          style={{width:'75%'}}
        >
          <Input value={outputPath}/>
        </Form.Item>
        <Form.Item style={{margin: '0 0 0 auto'}}>
          <Button onClick={changePath}>修改路徑</Button>
        </Form.Item>
      </Form>
      </div>
    </Modal>
  );
};

export default ConfigForm;
