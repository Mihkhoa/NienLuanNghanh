import "./style_listorders.css";
import React from "react";
import {Button, Table} from "antd";

function ListOrders() {

  const dataOrder = [
    {
      MaHDX: "HA"
    }
  ];

  const columns = [
    {
      title: 'Mã Hóa Đơn Xuất',
      dataIndex: 'MaHDX',
      key: 'MaHDX',
      width: "100px",
      align: "center"
    },
    {
      title: 'Ngày Lập Hóa Đơn Xuất',
      dataIndex: 'NgayLapHDX',
      key: 'NgayLapHDX',
      width: "200px",
      align: "center"
    },
    {
      title: 'TrangThaiHD',
      dataIndex: 'TrangThaiHD',
      key: 'TrangThaiHD',
      width: "200px",
      align: "center"
    },
    {
      title: 'Mã Khách hàng',
      dataIndex: 'MaKhachHang',
      key: 'MaKhachHang',
      width: "120px",
      align: "center"
    },
    {
      title: 'Xác Nhận Thanh Toán',
      dataIndex: 'XacNhan',
      key: 'XacNhan',
      width: "180px",
      align: "center",
      render: action => {
        return (
          <Button type="primary">Xác nhận</Button>
        )
      }
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'TenSP',
      key: 'TenSP',
      align: "center"
    },
  ];

  return (
    <div className="container">
      <div>
        <div className="listorder">
        <Table pagination={false} dataSource={dataOrder} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default ListOrders;
