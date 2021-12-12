import "../manage.css";
import React from "react";
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import {
  FileTextOutlined,
  AppstoreOutlined,
  HomeOutlined,
  FundOutlined,
  CarOutlined,
} from "@ant-design/icons";

const MenuPage = () => {
  const {SubMenu} = Menu;

  return (
    <div>
      <div className="menu_manage">
        <Menu style={{width: 256}} mode="inline">
          <SubMenu key="sub0" icon={<FundOutlined />} title="THỐNG KÊ">
            <Menu.Item key="1">
              <NavLink to="/manage">Xem thống kê</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="SẢN PHẨM">
            <Menu.Item key="2">
              <NavLink to="/manage/products">Danh sách sản phẩm</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/manage/add">Thêm sản phẩm</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FileTextOutlined />} title="HÓA ĐƠN">
            <Menu.Item key="4">
            <NavLink to="/manage/list_orders">Danh sách hóa đơn</NavLink></Menu.Item>
            <Menu.Item key="5">Đơn hủy</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<HomeOutlined />} title="KHO HÀNG">
            <Menu.Item key="6">Thêm kho hàng</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<CarOutlined />} title="VẬN CHUYỂN">
            <Menu.Item key="7">Comming Soon</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default MenuPage;
