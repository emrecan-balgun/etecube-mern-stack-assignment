import React, { useEffect, useState } from "react";

import { errorDataNotify } from "../constants/toastify";
import { getAllCompanies } from "../services/company";
import { getAllProducts } from "../services/product";
import { getTotalUser } from "../services/user";
import ChartItem from "../components/ChartItem";
import CompanyItem from "../components/CompanyItem";
import ProductItem from "../components/ProductItem";
import withLoading from "../hoc/withLoading";

function Reports({ setLoading, loading }) {
  const [totalUser, setTotalUser] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [recentCompany, setRecentCompany] = useState([]);
  const [recentProduct, setRecentProduct] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const totalUserResponse = await getTotalUser();
      const companyResponse = await getAllCompanies();
      const productResponse = await getAllProducts();

      setTotalUser(totalUserResponse.data.totalUser);
      setTotalCompany(companyResponse.data.totalCompany);
      setTotalProduct(productResponse.data.totalProduct);
      setRecentCompany(companyResponse.data.recentCompanies);
      setRecentProduct(productResponse.data.recentProducts);
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

  return (
    <div className="flex flex-col xl:flex-row gap-2">
      <ChartItem
        datas={{
          title: "Count of document",
          labels: ["Company", "Product", "User"],
          data: [totalCompany, totalProduct, totalUser],
          options: {},
        }}
        loading={loading}
      />
      <div className="flex flex-col lg:flex-row gap-2">
        <CompanyItem
          datas={{ title: "Recently added 3 companies", data: recentCompany }}
          loading={loading}
        />
        <ProductItem
          datas={{ title: "Recently added 3 products", data: recentProduct }}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default withLoading(Reports);
