import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default NotAuthorized;
