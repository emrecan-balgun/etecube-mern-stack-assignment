import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { registerUser } from '../services/auth';
import {
  successRegisterNotify,
  errorRegisterNotify,
  warningNotify,
} from '../constants/toastify';

function Register() {
  const [form] = Form.useForm();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerPage = async () => {
    const data = { name, username, password };
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        successRegisterNotify(response.data.message);
        setTimeout(() => {
          form.resetFields();
        }, 5500);
      }
    } catch (error) {
      console.log(error);
      errorRegisterNotify(error.response.data.message);
    }
  };

  const onFinish = () => {
    registerPage();
  };

  const onFinishFailed = () => {
    warningNotify();
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          onChange={(e) => setName(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          onChange={(e) => setUsername(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-gradient-to-br from-[#ff966d] to-[#fa538d] font-semibold h-10 rounded-lg text-white transition ease-in-out delay-150 hover:!text-white hover:!border-transparent"
            htmlType="submit"
          >
            Register
          </Button>
          <Button
            className="font-semibold h-10 rounded-lg"
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
