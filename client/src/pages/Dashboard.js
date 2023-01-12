import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { getUser, isRealUser } from '../services/user';
import NotAuthorized from './NotAuthorized';
import DashboardContent from '../components/DashboardContent';
import withLoading from '../hoc/withLoading';
import { errorDataNotify } from '../constants/toastify';

function Dashboard({ setLoading, loading }) {
  const [showDashboard, setShowDashboard] = useState(false);
  let decodeToken = jwt_decode(getUser());
  const id = decodeToken.userID;

  const checkUser = async () => {
    try {
      setLoading(true);
      const response = await isRealUser(id);
      if (response.status === 200) {
        setShowDashboard(true);
      }
    } catch (error) {
      errorDataNotify();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {showDashboard && !loading ? (
        <>
          <DashboardContent />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default withLoading(Dashboard);
