import "./style_listorders.css";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {Button, Table, Modal, Row, Col} from "antd";

import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";
import khachhangAPI from "../../../../api/khachhangAPI";
import ChiTietHoaDonXuatAPI from "../../../../api/chitiethoadonxuatAPI";

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
    NgayLapHDX: moment.utc(NgayLapHDX).add(1, 'days').format("DD/MM/YYYY"),
    TrangThaiHD: TrangThaiHD,
    TinhTrangHD: TinhTrangHD,
    MaKhachHang: MaKH,
    XacNhan: TrangThaiHD,
    TenSP: MaHDX,
  }));

  const columns = [
    {
      title: "M?? H??a ????n Xu???t",
      dataIndex: "MaHDX",
      key: "MaHDX",
      width: "100px",
      align: "center",
    },
    {
      title: "M?? Kh??ch h??ng",
      dataIndex: "MaKhachHang",
      key: "MaKhachHang",
      width: "120px",
      align: "center",
    },
    {
      title: "Ng??y L???p H??a ????n Xu???t",
      dataIndex: "NgayLapHDX",
      key: "NgayLapHDX",
      width: "200px",
      align: "center",
    },
    {
      title: "Tr???ng Th??i H??a ????n",
      key: "TrangThaiHD",
      width: "180px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TrangThaiHD === 0 ? (
            <>
              <p className="error">Ch??a thanh to??n</p>
            </>
          ) : (
            <></>
          )}
          {record.TrangThaiHD === 1 ? (
            <>
              <p className="success">???? thanh to??n</p>
            </>
          ) : (
            <></>
          )}
          {record.TrangThaiHD === -1 ? (
            <>
              <p className="false">???? h???y</p>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "T??nh Tr???ng H??a ????n",
      key: "TinhTrangHD",
      width: "180px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 ? (
            <>
              <p className="error">??ang giao h??ng</p>
            </>
          ) : (
            <></>
          )}
          {record.TinhTrangHD === 1 ? (
            <>
              <p className="success">Giao h??ng th??nh c??ng</p>
            </>
          ) : (
            <></>
          )}
          {record.TinhTrangHD === 3 ? (
            <>
              <p className="false">H???y - H??ng ho??n v???</p>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "X??c Nh???n",
      key: "XacNhan",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 && (
            <>
              <Button type="primary" onClick={() => submitPay(record.MaHDX, 1)}>
                X??c Nh???n
              </Button>
            </>
          )}
          {((record.TrangThaiHD === 1 && record.TinhTrangHD === 1) || record.TinhTrangHD === 3) && (
            <>
              <Button type="primary" disabled>
                X??c Nh???n
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      title: "H???y",
      key: "HuyHD",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          {record.TinhTrangHD === 0 && (
            <>
              <Button type="primary" onClick={() => cancelOrder(record.MaHDX, record.TrangThaiHD, 3)}>
                H???y
              </Button>
            </>
          )}
          {(record.TinhTrangHD === 1 || record.TinhTrangHD === 3) && (
            <>
              <Button type="primary" disabled>
                H???y
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      title: "Th??ng Tin Chi Ti???t",
      key: "TenSP",
      align: "center",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => viewInfoProduct(record.MaHDX, record.MaKhachHang)}>
            Th??ng tin ho?? ????n
          </Button>
          <Modal title="Th??ng tin h??a ????n" visible={isModalVisible} footer={false} onCancel={cancelModal}>
            <div>
              <p>T??n kh??ch h??ng: {dataKhachHang.TenKH}</p>
              <p>Email: {dataKhachHang.Email}</p>
              <p>SDT: {dataKhachHang.SDT}</p>
              <p>?????a ch???: {dataKhachHang.DiaChi}</p>
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
              <p>T???ng h??a ????n: {formatNumber.format(sumOrder.SUM_ORDER)}</p>
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
