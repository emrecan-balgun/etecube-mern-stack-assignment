import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Modal, message, Popconfirm } from "antd";

import {
  errorDataNotify,
  successCreateNotify,
  successDeleteNotify,
} from "../constants/toastify";
import { getAllUsers, deleteUser } from "../services/user";
import { registerUser } from "../services/auth";
import withLoading from "../hoc/withLoading";

function User({ setLoading, loading }) {
  // Variables
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get data
  const fetchData = async () => {
    try {
      setLoading(true);
      const userResponse = await getAllUsers();
      setUser(userResponse.data.users);
    } catch (error) {
      errorDataNotify();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalOk = async () => {
    const data = {
      name,
      username,
      password,
    };
    await registerUser(data);
    successCreateNotify();
    setIsAddModalOpen(false);
    await fetchData();
  };

  const handleAddModalCancel = () => {
    message.error("The operation was canceled");
    setIsAddModalOpen(false);
  };

  // Popup (for delete operation)
  const confirmPopup = async (id) => {
    await deleteUser(id);
    successDeleteNotify();
    await fetchData();
  };

  const cancelPopup = () => {
    message.error("The operation was canceled");
  };

  // Columns
  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => {
        return a.name > b.name;
      },
    },
    {
      key: "2",
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => {
        return a.name > b.name;
      },
      responsive: ["md"],
    },
    {
      key: "5",
      title: "Operations",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirmPopup(record._id)}
            onCancel={() => cancelPopup()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Add Modal - Start */}
      <Modal
        title="Add User"
        open={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        okText="Add"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <b>Name:</b>{" "}
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Username:</b>{" "}
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Password:</b>{" "}
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      {/* Add Modal - Finish */}
      <Button className="mb-2" type="primary" onClick={() => showAddModal()}>
        Add
      </Button>
      {/* Table - Start */}
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={user}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      ></Table>
      {/* Table - Finish */}
    </>
  );
}

export default withLoading(User);
