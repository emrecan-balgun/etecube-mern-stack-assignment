import React, { useState } from "react";
import { Card, Modal } from "antd";

import Loading from "./Loading";
import { getProduct } from "../services/product";
import { errorDataNotify } from "../constants/toastify";

function ProductItem({ datas, loading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [product, setProduct] = useState([]);
  const [company, setCompany] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await getProduct(id);
      setProduct(response.data.product);
      setCompany(response.data.product.company);
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
            title="Product Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>
              <b>Product name:</b> {product["productName"]}
            </p>
            <p>
              <b>Product category:</b> {product["productCategory"]}
            </p>
            <p>
              <b>Product quantity:</b> {product["productQuantity"]}
            </p>
            <p>
              <b>Unit of quantity:</b> {product["unitOfQuantity"]}
            </p>
            <p>
              <b>Company:</b> {company["companyName"]}
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
                  <p>{item.productName}</p>
                </div>
              );
            })}
          </Card>
        </>
      )}
    </>
  );
}

export default ProductItem;
