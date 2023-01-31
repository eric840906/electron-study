import { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { text } from 'stream/consumers';
import useLogin from '../hooks/useLogin';

const LoginForm: React.FC<{onOpen: any, onCancel: any}> = ({onOpen, onCancel}) => {
  const [login] = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleOk = () => {
    login(email, password)
  }

  return (
    <Modal
      title="還沒做完的登入功能"
      open={onOpen}
      onOk={handleOk}
      // confirmLoading={confirmLoading}
      onCancel={onCancel}
      cancelText="取消"
      okText='登入'
    >
      <div>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          paddingTop:10
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}

        >
          <Input value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Item>
      </Form>
      </div>
    </Modal>
  );
};

export default LoginForm;
