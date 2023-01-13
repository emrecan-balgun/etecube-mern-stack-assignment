import React, { useState } from "react";
import { Card, Modal } from "antd";

import Loading from "./Loading";
import { getCompany } from "../services/company";
import { errorDataNotify } from "../constants/toastify";

function CompanyItem({ datas, loading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [company, setCompany] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await getCompany(id);
      setCompany(response.data.company);
    } catch (error) {
      errorDataNotify();
    }
  };

  const showModal = async (id) => {
    await fetchData(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal
            title="Company Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>
              <b>Company name:</b> {company["companyName"]}
            </p>
            <p>
              <b>Company legal number:</b> {company["companyLegalNumber"]}
            </p>
            <p>
              <b>Country:</b> {company["country"]}
            </p>
            <p>
              <b>Website:</b> <a href={`${company["website"]}`} target="_blank" rel="noopener noreferrer">{company["website"]}</a>
            </p>
          </Modal>
          <Card title={datas.title} bordered={true} className="w-full">
            {datas.data.map((item) => {
              return (
                <div
                  className="hover:text-blue-500 hover:underline hover:cursor-pointer"
                  key={item._id}
                  onClick={() => showModal(item._id)}
                >
                  <p>{item.companyName}</p>
                </div>
              );
            })}
          </Card>
        </>
      )}
    </>
  );
}

export default CompanyItem;
