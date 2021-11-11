import "./style_listorders.css";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {Button, Table, Modal, Row, Col} from "antd";
import {useSelector} from "react-redux";

import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";
import khachhangAPI from "../../../../api/khachhangAPI";
import ChiTietHoaDonXuatAPI from "../../../../api/chitiethoadonxuatAPI";
import productAPI from "../../../../api/productAPI";

function ListOrders() {
  const [dataHDX, setDataHDX] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [renderData, setrenderData] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [sumOrder, setSumOrder] = useState([]);

  const formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllHoaDonXuat = await exportInvoiceAPI.findAll();
        setDataHDX(getAllHoaDonXuat);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const submitPay = async (MaHDX, key) => {
    if (MaHDX && key) {
      const update = {TrangThaiHD: key, TinhTrangHD: key};
      await exportInvoiceAPI.updateTTHD(MaHDX, update);
    }
    window.location.reload();
  };

  const cancelOrder = async (MaHDX, TrangThaiHD, key) => {
    if (MaHDX && key) {
      const update = {TinhTrangHD: key, TrangThaiHD: TrangThaiHD};
      await exportInvoiceAPI.updateTTHD(MaHDX, update);
    }
    window.location.reload();
  };

  const viewInfoProduct = async (MaHDX, MaKH) => {
    setIsModalVisible(true);
    try {
      if (MaHDX) {
        const data = await ChiTietHoaDonXuatAPI.findMHD(MaHDX);
        setrenderData(data);
        const sumOrder = await ChiTietHoaDonXuatAPI.sumOrder(MaHDX);
        setSumOrder(sumOrder[0])
        const getDataKhachHang = await khachhangAPI.findKhacHang(MaKH);
        setDataKhachHang(getDataKhachHang[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelModal = () => {
    setIsModalVisible(false);
  };

  const dataOrder = dataHDX?.map(({MaHDX, NgayLapHDX, TrangThaiHD, MaKH, TinhTrangHD}, i) => ({
    key: i,
    MaHDX: MaHDX,
    NgayLapHDX: moment.utc(NgayLapHDX).format("MM/DD/YYYY"),
    TrangThaiHD: TrangThaiHD,
    TinhTrangHD: TinhTrangHD,
    MaKhachHang: MaKH,
    XacNhan: TrangThaiHD,
    TenSP: MaHDX,
  }));

  const columns = [
    {
      title: "Mã Hóa Đơn Xuất",
      dataIndex: "MaHDX",
      key: "MaHDX",
      width: "100px",
      align: "center",
    },
    {
      title: "Mã Khách hàng",
      dataIndex: "MaKhachHang",
      key: "MaKhachHang",
      width: "120px",
      align: "center",
    },
    {
      title: "Ngày Lập Hóa Đơn Xuất",
      dataIndex: "NgayLapHDX",
      key: "NgayLapHDX",
      width: "200px",
      align: "center",
    },
    {
      title: "Trạng Thái Hóa Đơn",
      key: "TrangThaiHD",
      width: "180px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TrangThaiHD === 0 ? (
            <>
              <p className="error">Chưa thanh toán</p>
            </>
          ) : (
            <></>
          )}
          {record.TrangThaiHD === 1 ? (
            <>
              <p className="success">Đã thanh toán</p>
            </>
          ) : (
            <></>
          )}
          {record.TrangThaiHD === -1 ? (
            <>
              <p className="false">Đã hủy</p>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "Tình Trạng Hóa Đơn",
      key: "TinhTrangHD",
      width: "180px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 ? (
            <>
              <p className="error">Đang giao hàng</p>
            </>
          ) : (
            <></>
          )}
          {record.TinhTrangHD === 1 ? (
            <>
              <p className="success">Giao hàng thành công</p>
            </>
          ) : (
            <></>
          )}
          {record.TinhTrangHD === 3 ? (
            <>
              <p className="false">Hủy - Hàng hoàn về</p>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "Xác Nhận",
      key: "XacNhan",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 && (
            <>
              <Button type="primary" onClick={() => submitPay(record.MaHDX, 1)}>
                Xác Nhận
              </Button>
            </>
          )}
          {((record.TrangThaiHD === 1 && record.TinhTrangHD === 1) || record.TinhTrangHD === 3) && (
            <>
              <Button type="primary" disabled>
                Xác Nhận
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      title: "Hủy",
      key: "HuyHD",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 && (
            <>
              <Button type="primary" onClick={() => cancelOrder(record.MaHDX, record.TrangThaiHD, 3)}>
                Hủy
              </Button>
            </>
          )}
          {(record.TinhTrangHD === 1 || record.TinhTrangHD === 3) && (
            <>
              <Button type="primary" disabled>
                Hủy
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      title: "Thông Tin Chi Tiết",
      key: "TenSP",
      align: "center",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => viewInfoProduct(record.MaHDX, record.MaKhachHang)}>
            Thông tin hoá đơn
          </Button>
          <Modal title="Thông tin hóa đơn" visible={isModalVisible} footer={false} onCancel={cancelModal}>
            <div>
              <p>Tên khách hàng: {dataKhachHang.TenKH}</p>
              <p>Email: {dataKhachHang.Email}</p>
              <p>SDT: {dataKhachHang.SDT}</p>
              <p>Địa chỉ: {dataKhachHang.DiaChi}</p>
              <hr />
              <br />
              {renderData?.map(({MaSP, TenSP, SoLuongXuat}, i) => (
                <div key={i}>
                  <Row>
                    <Col span={3}>
                      <span>{MaSP} </span>
                    </Col>
                    <Col span={18}>
                      <span>{TenSP}</span>
                    </Col>
                    <Col span={3}>
                      <span>x {SoLuongXuat}</span>
                    </Col>
                  </Row>
                </div>
              ))}
              <br />
              <hr />
              <br />
              <p>Tổng hóa đơn: {formatNumber.format(sumOrder.SUM_ORDER)}</p>
            </div>
          </Modal>
        </>
      ),
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
