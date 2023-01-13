import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import NotAuthorized from "./NotAuthorized";
import { getUser, isRealUser } from "../services/user";
import DashboardContent from "../components/DashboardContent";
import { errorDataNotify } from "../constants/toastify";

function Dashboard() {
  const [showDashboard, setShowDashboard] = useState(false);
  let decodeToken = jwt_decode(getUser());
  const id = decodeToken.userID;

  const checkUser = async () => {
    try {
      const response = await isRealUser(id);
      if (response.status === 200) {
        setShowDashboard(true);
      }
    } catch (error) {
      errorDataNotify();
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showDashboard ? (
        <>
          <DashboardContent />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default Dashboard;
