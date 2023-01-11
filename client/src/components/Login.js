import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { loginUser } from '../services/auth';
import {
  successLoginNotify,
  errorLoginNotify,
  warningNotify,
} from '../constants/toastify';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginPage = async () => {
    const data = { username, password };
    try {
      const response = await loginUser(data);
      if (response.status === 200) {
        successLoginNotify(response.data.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 5500);
      }
    } catch (error) {
      errorLoginNotify(error.response.data.message);
    }
  };

  const onFinish = () => {
    loginPage();
  };

  const onFinishFailed = () => {
    warningNotify();
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
