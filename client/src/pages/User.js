import React, { useEffect, useState } from 'react';

import { errorDataNotify } from '../constants/toastify';
// import { getAllUser } from '../services/user';

import withLoading from '../hoc/withLoading';

function User({ setLoading, loading }) {
  const [user, setUser] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
    //   const userResponse = await getAllUser();
    //   setUser(userResponse.data);
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
      Users
    </div>
  );
}

export default withLoading(User);
