import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import EtecubeMenuLogo from '../assets/img/etecube-menu-logo.png';
import { items } from '../constants/menu';
import Reports from '../pages/Reports';
import User from '../pages/User';
import Product from '../pages/Product';
import Company from '../pages/Company';

function DashboardContent() {
  const { Content, Header, Footer, Sider } = Layout;
  const [activePageName, setActivePageName] = useState('Home');
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    setActivePageName(e.key);
  };

  const changePage = () => {
    switch (activePageName) {
      case 'Home':
        return <Reports />;
      case 'Company':
        return <Company />;
      case 'Product':
        return <Product />;
      case 'User':
        return <User />;
      default:
        return <Reports />;
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
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
          defaultSelectedKeys={['Home']}
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
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>{activePageName}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {changePage(activePageName)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Etecube ©2023 Created by Emrecan Balgun
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DashboardContent;
