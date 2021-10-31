import "./style_paymentpage.css";
import React, {useEffect, useState} from "react";
import {Row, Col} from "antd";
import {useSelector} from "react-redux";
import cartAPI from "../../api/cartAPI";

function PaymentPage() {
  const [cartData, setCartData] = useState([]);
  const [sumGiaSPX, setSumGiaSPX] = useState("");

  const Username = useSelector((state) => state.user.current.username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data_Product = await cartAPI.innerJoinProduct(Username);
        setCartData(data_Product);
        const data_sumMaSPX = await cartAPI.sumOrder(Username);
        setSumGiaSPX(data_sumMaSPX[0].sumOrder);
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
    <div>
      <Row>
        <Col span={4}>
          <img
            className="image_product"
            src={HinhAnhSP.slice(12, HinhAnhSP.length)}
            alt="hinh anh"
          />
        </Col>
        <Col span={16}>
          <span className="title_product">
            {TenSP} x {SLSP}
          </span>
        </Col>
        <Col span={4}>
          <span className="price_product">
            {formatNumber.format(GiaSPX * SLSP)}
          </span>
        </Col>
      </Row>
    </div>
  ));

  return (
    <>
      <div className="container_paymentpage">
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
              <div className="btn_payOffline">
                <button>THANH TOÁN KHI NHẬN HÀNG</button>
              </div>
            </Col>
            <Col span={12}>
              <div className="btn_payOnline">
                <button>THANH TOÁN QUA VNPAY</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
