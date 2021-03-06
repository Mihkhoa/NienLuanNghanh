import "./style_paymentpage.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Row, Col, Modal, Select, Button, Form} from "antd";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import cartAPI from "../../api/cartAPI";
import vnPayAPI from "../../api/vnpayAPI";
import KhachHangAPI from "../../api/khachhangAPI";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";
import ChiTietHoaDonXuatAPI from "../../api/chitiethoadonxuatAPI";

const PaymentPage = () => {
  const {Option} = Select;

  const [cartData, setCartData] = useState([]);
  const [sumGiaSPX, setSumGiaSPX] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataKhachHang, setDataKhachHang] = useState([]);

  const Username = useSelector((state) => state.user.current.username);
  const history = useHistory();

  const date = (day) => {
    return moment().add(day, "days").format("YYYY-MM-DD");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data_Product = await cartAPI.innerJoinProduct(Username);
        setCartData(data_Product);
        const data_sumMaSPX = await cartAPI.sumOrder(Username);
        setSumGiaSPX(data_sumMaSPX[0].sumOrder);
        const dataKhachHang = await KhachHangAPI.findAll(Username);
        setDataKhachHang(dataKhachHang);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Username]);

  const formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const renderProduct = cartData?.map(({HinhAnhSP, TenSP, GiaSPX, SLSP}, i) => (
    <div key={i}>
      <Row>
        <Col span={4}>
          <img className="image_product" src={HinhAnhSP.slice(12, HinhAnhSP.length)} alt="hinh anh" />
        </Col>
        <Col span={16}>
          <span className="title_product">
            {TenSP} x <strong>{SLSP}</strong>
          </span>
        </Col>
        <Col span={4}>
          <span className="price_product">{formatNumber.format(GiaSPX * SLSP)}</span>
        </Col>
      </Row>
    </div>
  ));

  const Sortdata = (data) => {
    return {
      orderType: data.orderType,
      amount: sumGiaSPX,
      bankCode: data.bankCode,
      language: "vn",
    };
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const url = await vnPayAPI.create(Sortdata(values));
    setTimeout(() => {
      window.location = url;
    }, 1500);
    setIsModalVisible(false);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const dataHoaDonXuat = () => {
    return {
      NgayLapHDX: date(0),
      TrangThaiHD: 0,
      TinhTrangHD: 0,
      MaKH: dataKhachHang[0].MaKH,
      MaKhoHang: "1",
    };
  };

  const dataChiTietHDX = (data, MaHDX) => {
    return {
      MaHDX: MaHDX,
      SoLuongXuat: data.SLSP,
      MaSP: data.MaSP,
    };
  };

  let i = 0;
  const paymentOffline = async () => {
    if (!dataKhachHang) {
      history.push("/profile");
    } else {
      const dataProductCart = await cartAPI.findAll(Username);
      await exportInvoiceAPI.create(dataHoaDonXuat());
      const MaHDX = await exportInvoiceAPI.findMaHDX();
      for (i; i < dataProductCart.length; i++) {
        await ChiTietHoaDonXuatAPI.create(dataChiTietHDX(dataProductCart[i], MaHDX[0].MaHDX));
      }

      setTimeout(() => {}, 1000);
      await cartAPI.DeleteAll(Username);
      history.push("/order");
    }
  };

  return (
    <>
      <div className="container_paymentpage">
        {cartData.length !== 0 ? (
          <>
            <div className="payment_product">
              <h2>????N H??NG C???A B???N</h2>
              {renderProduct}
            </div>
            <div className="info_payment">
              <Row>
                <Col span={6}>
                  <strong>T???m t??nh</strong>
                </Col>
                <Col span={18}>{formatNumber.format(sumGiaSPX)}</Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Giao h??ng</strong>
                </Col>
                <Col span={18}>Mi???n ph?? giao h??ng</Col>
              </Row>
              <hr />
              <Row>
                <Col span={6}>
                  <strong>T???ng</strong>
                </Col>
                <Col span={18}>
                  <strong>{formatNumber.format(sumGiaSPX)}</strong>
                </Col>
              </Row>
            </div>
            <div className="btn_payment">
              <Row>
                <Col span={12}>
                  <div className="btn_payOffline" onClick={() => paymentOffline()}>
                    <button>THANH TO??N KHI NH???N H??NG</button>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="btn_payOnline" onClick={showModal}>
                    <button>THANH TO??N QUA VNPAY</button>
                  </div>
                  <Modal title="VNPAY - T???O ????N H??NG" visible={isModalVisible} onCancel={onCancel} footer={false}>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      initialValues={{
                        orderType: "billpayment",
                        bankCode: "",
                      }}
                    >
                      <Form.Item label="Lo???i h??ng h??a" name="orderType">
                        <Select label="Select" style={{width: 240}}>
                          <Option value="billpayment">Thanh to??n h??a ????n</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item label="Ng??n h??ng" name="bankCode">
                        <Select label="Select" style={{width: 240}}>
                          <Select.Option value=""> Kh??ng ch???n</Select.Option>
                          <Select.Option value="VNPAYQR"> Ng??n h??ng VNPAYQR</Select.Option>
                          <Select.Option value="NCB"> Ng??n h??ng NCB</Select.Option>
                          <Select.Option value="SCB"> Ng??n h??ng SCB</Select.Option>
                          <Select.Option value="SACOMBANK"> Ng??n h??ng SACOMBANK</Select.Option>
                          <Select.Option value="EXIMBANK"> Ng??n h??ng EXIMBANK</Select.Option>
                          <Select.Option value="MSBANK"> Ng??n h??ng MSBANK</Select.Option>
                          <Select.Option value="NAMABANK"> Ng??n h??ng NAMABANK</Select.Option>
                          <Select.Option value="VISA"> Ng??n h??ng VISA</Select.Option>
                          <Select.Option value="VNMART"> Ng??n h??ng VNMART</Select.Option>
                          <Select.Option value="VIETINBANK">Ng??n h??ng VIETINBANK</Select.Option>
                          <Select.Option value="VIETCOMBANK">Ng??n h??ng VIETCOMBANK</Select.Option>
                          <Select.Option value="HDBANK"> Ng??n h??ng HDBANK</Select.Option>
                          <Select.Option value="DONGABANK"> Ng??n h??ng Dong A</Select.Option>
                          <Select.Option value="TPBANK"> Ng??n h??ng Tp Bank</Select.Option>
                          <Select.Option value="OJB"> Ng??n h??ng OceanBank</Select.Option>
                          <Select.Option value="BIDV"> Ng??n h??ng BIDV</Select.Option>
                          <Select.Option value="TECHCOMBANK">Ng??n h??ng Techcombank</Select.Option>
                          <Select.Option value="VPBANK"> Ng??n h??ng VPBank</Select.Option>
                          <Select.Option value="AGRIBANK"> Ng??n h??ng AGRIBANK</Select.Option>
                          <Select.Option value="MBBANK"> Ng??n h??ng MBBank</Select.Option>
                          <Select.Option value="ACB"> Ng??n h??ng ACB</Select.Option>
                          <Select.Option value="OCB"> Ng??n h??ng OCB</Select.Option>
                          <Select.Option value="SHB"> Ng??n h??ng SHB</Select.Option>
                          <Select.Option value="IVB"> Ng??n h??ng IVB</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          THANH TO??N
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </Col>
              </Row>
            </div>
          </>
        ) : (
          <>
            <span>B???n ch??a c?? s???n ph???m n??o c???!!</span>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
