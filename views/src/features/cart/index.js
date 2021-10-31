import "./style_cartpage.css";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {Table, Row, Col} from "antd";
import {DeleteFilled} from "@ant-design/icons";

import cartAPI from "../../api/cartAPI";

function CartPage() {
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

  const delProduct = async (MaGH) => {
    await cartAPI.DeleteOne(MaGH);
    console.log(MaGH);
    window.location.reload();
  }

  const columns = [
    {
      title: "",
      dataIndex: "HinhAnhSP",
      key: "HinhAnhSP",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          <img className="img_product_cart" src={text} alt="hinh anh" />
        </>
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "TenSP",
      key: "TenSP",
    },
    {
      title: "Giá",
      dataIndex: "GiaSPX",
      key: "GiaSPX",
      align: "center",
    },
    {
      title: "Số Lượng",
      dataIndex: "SoLuongSP",
      key: "SoLuongSP",
      align: "center",
    },
    {
      title: "Tạm Tính",
      key: "TamTinh",
      dataIndex: "TamTinh",
      align: "center",
    },
    {
      title: "",
      key: "xoa",
      dataIndex: "xoa",
      align: "center",
      render: (text, record) => (
        <>
          <div className="del_product" onClick={() => delProduct(text)}>
            <DeleteFilled style={{ fontSize: '16px', color: '#C7031E' }} />
          </div>
        </>
      ),
    },
  ];

  const data = cartData?.map(({HinhAnhSP, TenSP, GiaSPX, SLSP, MaGH}, i) => ({
    key: `${i}`,
    HinhAnhSP: `${HinhAnhSP.slice(12, HinhAnhSP.length)}`,
    TenSP: `${TenSP}`,
    GiaSPX: `${formatNumber.format(GiaSPX)}`,
    SoLuongSP: `${SLSP}`,
    TamTinh: `${formatNumber.format(GiaSPX * SLSP)}`,
    xoa: `${MaGH}`,
  }));
  console.log(cartData.length);
  return (
    <div className="container_cart">
      {cartData.length !== 0 ? (
        <>
          <div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="wrap_order">
            <h2>CỘNG GIỎ HÀNG</h2>
            <div className="order_cart">
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
                <Col span={18}>
                  Giao hàng tận nơi: 30.000 ₫ <br /> Tùy chọn giao hàng sẽ được
                  cập nhật trong quá trình thanh toán.
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Tổng</strong>
                </Col>
                <Col span={18}>{formatNumber.format(sumGiaSPX)}</Col>
              </Row>
            </div>
            <div>
              <NavLink to="/payment"><button className="btn_thanhtoan">TIẾN HÀNH THANH TOÁN</button></NavLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <div><h2>Không có sản phẩm nào trong giỏ hàng !!!</h2></div>
          <NavLink to="/products" ><div className="btn_BackProductPage">TRỞ LẠI TRANG SẢN PHẨM</div></NavLink>
        </>
      )}
    </div>
  );
}

export default CartPage;
