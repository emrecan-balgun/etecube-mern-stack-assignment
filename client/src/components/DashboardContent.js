import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

import EtecubeMenuLogo from "../assets/img/etecube-menu-logo.png";
import { items } from "../constants/menu";
import Reports from "../pages/Reports";
import User from "../pages/User";
import Product from "../pages/Product";
import Company from "../pages/Company";
import { logoutUser } from "../services/user";
import { successLogoutNotify } from "../constants/toastify";

function DashboardContent() {
  const { Content, Header, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    setActiveCategoryName(e.key);
  };

  const logout = () => {
    logoutUser();
    successLogoutNotify();
    setTimeout(() => {
      navigate("/");
    }, 5500);
  };

  const [activeCategoryName, setActiveCategoryName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("activeCategory") !== null) {
      setActiveCategoryName(localStorage.getItem("activeCategory"));
    }
  }, []);

  const activeCategory = (categoryName) => {
    localStorage.setItem("activeCategory", categoryName);
  };

  const changePage = () => {
    switch (activeCategoryName) {
      case "Home":
        activeCategory("Home");
        return <Reports />;
      case "Company":
        activeCategory("Company");
        return <Company />;
      case "Product":
        activeCategory("Product");
        return <Product />;
      case "User":
        activeCategory("User");
        return <User />;
      case "Logout":
        logout();
        break;
      default:
        return <Reports />;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
          }}
        >
          <img
            className="w-full"
            src={EtecubeMenuLogo}
            alt="etecube_menu_logo"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[localStorage.getItem("activeCategory")]}
          mode="inline"
          items={items}
          onClick={onClick}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{activeCategoryName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {changePage(activeCategoryName)}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Etecube ©2023 Created by Emrecan Balgun
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DashboardContent;
