import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import EtecubeMenuLogo from '../assets/img/etecube-menu-logo.png';
import { items } from '../constants/menu';
import { NavLink } from 'react-router-dom';
import Reports from '../pages/Reports';

function DashboardContent() {
  const { Content, Header, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          defaultSelectedKeys={['1']}
          mode="inline"
          // items={items}
        >
          <Menu.Item key="/dashboard">
            <NavLink to="/dashboard" className="nav-text">
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard1">
            <NavLink to="/dashboard1" className="nav-text">
              Tenants
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard2">
            <NavLink to="/dashboard2" className="nav-text">
              Users
            </NavLink>
          </Menu.Item>
        </Menu>
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
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Charts</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Reports />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardContent;
