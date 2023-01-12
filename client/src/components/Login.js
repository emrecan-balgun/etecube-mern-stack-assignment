import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Typography, Input, Button } from "antd";
import { useDispatch } from "react-redux";

import { changeShow } from "../store/etecube/etecubeSlice";
import { loginUser } from "../services/auth";
import {
  successLoginNotify,
  errorLoginNotify,
  warningNotify,
} from "../constants/toastify";

function Login() {
  const { Text } = Typography;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changePage = () => {
    dispatch(changeShow());
  };

  const login = async () => {
    const data = { username, password };
    try {
      const response = await loginUser(data);
      if (response.status === 200) {
        successLoginNotify(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5500);
      }
    } catch (error) {
      errorLoginNotify(error.response.data.message);
    }
  };

  const onFinish = () => {
    login();
  };

  const onFinishFailed = () => {
    warningNotify();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return login();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white">Login</h1>
      <div className="h-full w-full flex justify-center">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="block md:hidden">
            <Text
              className="text-white"
              onClick={() => {
                changePage();
              }}
            >
              Don't have an account yet?
            </Text>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:!text-white hover:!border-transparent rounded-lg focus:outline-none focus:shadow-outline"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
