import React, { useEffect, useState } from 'react';

import { errorDataNotify } from '../constants/toastify';
import { getAllProducts } from '../services/product';

import withLoading from '../hoc/withLoading';

function Product({ setLoading, loading }) {
  const [product, setProduct] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productResponse = await getAllProducts();
      setProduct(productResponse.data);
    } catch (error) {
      errorDataNotify();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      Products
    </div>
  );
}

export default withLoading(Product);
