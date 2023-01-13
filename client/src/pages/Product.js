import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, message, Popconfirm } from "antd";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css"; // 13 warnings

import {
  errorDataNotify,
  successCreateNotify,
  successDeleteNotify,
  successUpdateNotify,
} from "../constants/toastify";
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../services/product";
import { getAllCompanies } from "../services/company";
import withLoading from "../hoc/withLoading";

function Product({ setLoading, loading }) {
  // Variables
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [product, setProduct] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [unitOfQuantity, setUnitOfQuantity] = useState("");
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [companies, setCompanies] = useState([]);

  // Get data
  const fetchData = async () => {
    try {
      setLoading(true);
      const productResponse = await getAllProducts();
      const companyResponse = await getAllCompanies();
      setProduct(productResponse.data.products);
      setCompanies(companyResponse.data.companies);
      setFilters(
        productResponse.data.products.map((item) => {
          const key = item.productCategory;
          return {
            text: key,
            value: key,
          };
        })
      );
    } catch (error) {
      errorDataNotify();
    } finally {
      setLoading(false);
    }
  };

  const getProductData = async (id) => {
    try {
      setLoading(true);
      const response = await getProduct(id);
      setProductId(id);
      setProductName(response.data.product.productName);
      setProductCategory(response.data.product.productCategory);
      setProductQuantity(response.data.product.productQuantity);
      setUnitOfQuantity(response.data.product.unitOfQuantity);
      setCompany(response.data.product.company.companyName);
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

  // Clear input fields
  const clearInputFields = () => {
    setProductName("");
    setProductCategory("");
    setProductQuantity("");
    setUnitOfQuantity("");
    setCompany("");
  };

  // Edit Modal
  const showEditModal = async (id) => {
    await getProductData(id);
    setEditIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = {
      productName,
      productCategory,
      productQuantity,
      unitOfQuantity,
      company: companyId,
    };
    await updateProduct(productId, data);
    successUpdateNotify();
    setEditIsModalOpen(false);
    await fetchData();
  };

  const handleCancel = () => {
    message.error("The operation was canceled");
    setEditIsModalOpen(false);
  };

  const handleChange = (value) => {
    setCompany(value.companyName);
    setCompanyId(value._id);
  };

  // Add modal
  const showAddModal = () => {
    clearInputFields();
    setIsAddModalOpen(true);
  };

  const handleAddModalOk = async () => {
    const data = {
      productName,
      productCategory,
      productQuantity,
      unitOfQuantity,
      company: companyId,
    };
    await createProduct(data);
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
    await deleteProduct(id);
    successDeleteNotify();
    await fetchData();
  };

  const cancelPopup = () => {
    message.error("The operation was canceled");
  };

  // Search functions on table
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Columns
  const columns = [
    {
      key: "1",
      title: "Product Name",
      dataIndex: "productName",
      sorter: (a, b) => {
        return a.productName > b.productName;
      },
    },
    {
      key: "2",
      title: "Product Category",
      dataIndex: "productCategory",
      filters: filters,
      onFilter: (value, record) => record.productCategory.startsWith(value),
      responsive: ["md"],
    },
    {
      key: "3",
      title: "Product Quantity",
      dataIndex: "productQuantity",
      ...getColumnSearchProps("productQuantity"),
      responsive: ["md"],
    },
    {
      key: "4",
      title: "Unit Of Quantity",
      dataIndex: "unitOfQuantity",
      ...getColumnSearchProps("unitOfQuantity"),
      responsive: ["md"],
    },
    {
      key: "5",
      title: "Operations",
      render: (_, record) => (
        <Space size="middle" className="flex flex-col md:flex-row">
          <Button type="link" onClick={() => showEditModal(record._id)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
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
        title="Add Product"
        open={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        okText="Add"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <b>Product name:</b>{" "}
            <Input
              value={productName}
              placeholder="Product name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Product category:</b>{" "}
            <Input
              value={productCategory}
              placeholder="Product category"
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Product quantity:</b>{" "}
            <Input
              value={productQuantity}
              placeholder="Product quantity"
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Unit of quantity:</b>{" "}
            <Input
              value={unitOfQuantity}
              placeholder="Unit of quantity"
              onChange={(e) => setUnitOfQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Company:</b>{" "}
            <DropdownList
              data={companies}
              dataKey="id"
              textField="companyName"
              value={company}
              onChange={(value) => handleChange(value)}
            />
          </div>
        </div>
      </Modal>
      {/* Add Modal - Finish */}
      {/* Edit Modal - Start */}
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <b>Product name:</b>{" "}
            <Input
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Product category:</b>{" "}
            <Input
              placeholder="Product category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Product quantity:</b>{" "}
            <Input
              placeholder="Product quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Unit of quantity:</b>{" "}
            <Input
              placeholder="Unit of quantity"
              value={unitOfQuantity}
              onChange={(e) => setUnitOfQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Company:</b>{" "}
            <DropdownList
              data={companies}
              textField="companyName"
              value={company}
              onChange={(value) => handleChange(value)}
            />
          </div>
        </div>
      </Modal>
      {/* Edit Modal - Finish */}
      <Button className="mb-2" type="primary" onClick={() => showAddModal()}>
        Add
      </Button>
      {/* Table - Start */}
      <Table
        className=""
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={product}
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

export default withLoading(Product);
