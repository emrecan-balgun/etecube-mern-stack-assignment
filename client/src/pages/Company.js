import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, message, Popconfirm } from "antd";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
import ReactFlagsSelect from "react-flags-select";
import { countries } from "country-data";

import {
  errorDataNotify,
  successCreateNotify,
  successDeleteNotify,
  successUpdateNotify,
} from "../constants/toastify";
import {
  getAllCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
  createCompany,
} from "../services/company";
import withLoading from "../hoc/withLoading";

function Company({ setLoading, loading }) {
  // Variables
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [company, setCompany] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLegalNumber, setCompanyLegalNumber] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");

  // Get data
  const fetchData = async () => {
    try {
      setLoading(true);
      const companyResponse = await getAllCompanies();
      setCompany(companyResponse.data.companies);
      setFilters(
        companyResponse.data.companies.map((item) => {
          const key = item.country;
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

  const getCompanyData = async (id) => {
    try {
      setLoading(true);
      const response = await getCompany(id);
      setCompanyId(id);
      setCompanyName(response.data.company.companyName);
      setCompanyLegalNumber(response.data.company.companyLegalNumber);
      setCountry(response.data.company.country);
      setWebsite(response.data.company.website);
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

  // Set country
  function changeCountry(code) {
    setCountry(countries[code].name);
  }

  // Clear input fields
  const clearInputFields = () => {
    setCompanyId("");
    setCompanyName("");
    setCompanyLegalNumber("");
    setCountry("");
    setWebsite("");
  };

  // Edit Modal
  const showEditModal = async (id) => {
    await getCompanyData(id);
    setEditIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = { companyName, companyLegalNumber, country, website };
    await updateCompany(companyId, data);
    successUpdateNotify();
    setEditIsModalOpen(false);
    await fetchData();
  };

  const handleCancel = () => {
    message.error("The operation was canceled");
    setEditIsModalOpen(false);
  };

  // Add modal
  const showAddModal = () => {
    clearInputFields();
    setIsAddModalOpen(true);
  };

  const handleAddModalOk = async () => {
    const data = { companyName, companyLegalNumber, country, website };
    await createCompany(data);
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
    await deleteCompany(id);
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
      title: "Company Name",
      dataIndex: "companyName",
      sorter: (a, b) => {
        return a.companyName > b.companyName;
      },
    },
    {
      key: "2",
      title: "Company Legal Number",
      dataIndex: "companyLegalNumber",
      ...getColumnSearchProps("companyLegalNumber"),
      responsive: ["md"],
    },
    {
      key: "3",
      title: "Country",
      dataIndex: "country",
      filters: filters,
      onFilter: (value, record) => record.country.startsWith(value),
      responsive: ["md"],
    },
    {
      key: "4",
      title: "Website",
      dataIndex: "website",
      ...getColumnSearchProps("website"),
      responsive: ["md"],
      render: (text, record) => (
        <a href={record.website} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
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
            title="Delete the company"
            description="Are you sure to delete this company?"
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
        title="Add Company"
        open={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        okText="Add"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <b>Company name:</b>{" "}
            <Input
              value={companyName}
              placeholder="Company name"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Company legal number:</b>{" "}
            <Input
              value={companyLegalNumber}
              placeholder="Company legal number"
              onChange={(e) => setCompanyLegalNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Country:</b>{" "}
            <ReactFlagsSelect
              selected={country}
              onSelect={(code) => changeCountry(code)}
              placeholder={country}
              showSelectedLabel={true}
              showOptionLabel={true}
              searchable={true}
              searchPlaceholder="Search countries"
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Website:</b>{" "}
            <Input
              value={website}
              placeholder="Website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      {/* Add Modal - Finish */}
      {/* Edit Modal - Start */}
      <Modal
        title="Edit Company"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <b>Company name:</b>{" "}
            <Input
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Company legal number:</b>{" "}
            <Input
              placeholder="Company legal number"
              value={companyLegalNumber}
              onChange={(e) => setCompanyLegalNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Country:</b>{" "}
            <ReactFlagsSelect
              selected={country}
              onSelect={(code) => changeCountry(code)}
              placeholder={country}
              showSelectedLabel={true}
              showOptionLabel={true}
              searchable={true}
              searchPlaceholder="Search countries"
            />
          </div>
          <div className="flex flex-col gap-1">
            <b>Website:</b>{" "}
            <Input
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={company}
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

export default withLoading(Company);
