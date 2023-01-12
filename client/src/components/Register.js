import React, { useState } from "react";
import { Form, Typography, Input, Button } from "antd";
import { useDispatch } from "react-redux";

import { changeShow } from "../store/etecube/etecubeSlice";
import { registerUser } from "../services/auth";
import {
  successRegisterNotify,
  errorRegisterNotify,
  warningNotify,
} from "../constants/toastify";

function Register() {
  const { Text } = Typography;

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changePage = () => {
    dispatch(changeShow());
  };

  const register = async () => {
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
      errorRegisterNotify(error.response.data.message);
    }
  };

  const onFinish = () => {
    register();
  };

  const onFinishFailed = () => {
    warningNotify();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return register();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white">Register</h1>
      <div className="h-full w-full flex justify-center">
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
            rules={[{ required: true, message: "Please input your name!" }]}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            <Input />
          </Form.Item>

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
              Do you already have an account?
            </Text>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:!text-white hover:!border-transparent rounded-lg focus:outline-none focus:shadow-outline"
              htmlType="submit"
            >
              Register
            </Button>
            <Button
              className="font-semibold h-10 rounded-lg mt-3 md:mt-0 ml-3"
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
