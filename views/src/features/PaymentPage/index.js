import "./style_paymentpage.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Row, Col, Modal, Select, Button, Form} from "antd";
import {useSelector} from "react-redux";
import {useHistory, Redirect} from "react-router-dom";

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
    }, 2000);
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
      console.log(dataKhachHang)
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
              <h2>ĐƠN HÀNG CỦA BẠN</h2>
              {renderProduct}
            </div>
            <div className="info_payment">
              <Row>
                <Col span={6}>
                  <strong>Tạm tính</strong>
                </Col>
                <Col span={18}>{formatNumber.format(sumGiaSPX)}</Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Giao hàng</strong>
                </Col>
                <Col span={18}>Miễn phí giao hàng</Col>
              </Row>
              <hr />
              <Row>
                <Col span={6}>
                  <strong>Tổng</strong>
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
                    <button>THANH TOÁN KHI NHẬN HÀNG</button>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="btn_payOnline" onClick={showModal}>
                    <button>THANH TOÁN QUA VNPAY</button>
                  </div>
                  <Modal title="VNPAY - TẠO ĐƠN HÀNG" visible={isModalVisible} onCancel={onCancel} footer={false}>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      initialValues={{
                        orderType: "billpayment",
                        bankCode: "",
                      }}
                    >
                      <Form.Item label="Loại hàng hóa" name="orderType">
                        <Select label="Select" style={{width: 240}}>
                          <Option value="billpayment">Thanh toán hóa đơn</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item label="Ngân hàng" name="bankCode">
                        <Select label="Select" style={{width: 240}}>
                          <Select.Option value=""> Không chọn</Select.Option>
                          <Select.Option value="VNPAYQR"> Ngân hàng VNPAYQR</Select.Option>
                          <Select.Option value="NCB"> Ngân hàng NCB</Select.Option>
                          <Select.Option value="SCB"> Ngân hàng SCB</Select.Option>
                          <Select.Option value="SACOMBANK"> Ngân hàng SACOMBANK</Select.Option>
                          <Select.Option value="EXIMBANK"> Ngân hàng EXIMBANK</Select.Option>
                          <Select.Option value="MSBANK"> Ngân hàng MSBANK</Select.Option>
                          <Select.Option value="NAMABANK"> Ngân hàng NAMABANK</Select.Option>
                          <Select.Option value="VISA"> Ngân hàng VISA</Select.Option>
                          <Select.Option value="VNMART"> Ngân hàng VNMART</Select.Option>
                          <Select.Option value="VIETINBANK">Ngân hàng VIETINBANK</Select.Option>
                          <Select.Option value="VIETCOMBANK">Ngân hàng VIETCOMBANK</Select.Option>
                          <Select.Option value="HDBANK"> Ngân hàng HDBANK</Select.Option>
                          <Select.Option value="DONGABANK"> Ngân hàng Dong A</Select.Option>
                          <Select.Option value="TPBANK"> Ngân hàng Tp Bank</Select.Option>
                          <Select.Option value="OJB"> Ngân hàng OceanBank</Select.Option>
                          <Select.Option value="BIDV"> Ngân hàng BIDV</Select.Option>
                          <Select.Option value="TECHCOMBANK">Ngân hàng Techcombank</Select.Option>
                          <Select.Option value="VPBANK"> Ngân hàng VPBank</Select.Option>
                          <Select.Option value="AGRIBANK"> Ngân hàng AGRIBANK</Select.Option>
                          <Select.Option value="MBBANK"> Ngân hàng MBBank</Select.Option>
                          <Select.Option value="ACB"> Ngân hàng ACB</Select.Option>
                          <Select.Option value="OCB"> Ngân hàng OCB</Select.Option>
                          <Select.Option value="SHB"> Ngân hàng SHB</Select.Option>
                          <Select.Option value="IVB"> Ngân hàng IVB</Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          THANH TOÁN
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </Col>
              </Row>
            </div>
          </>
        ) : (<><span>Bạn chưa có sản phẩm nào cả!!</span></>)}
      </div>
    </>
  );
};

export default PaymentPage;
