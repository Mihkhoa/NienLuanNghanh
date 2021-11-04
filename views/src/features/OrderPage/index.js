import "./style_orderpage.css";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Row, Col} from "antd";

import vnPayAPI from "../../api/vnpayAPI";
import cartAPI from "../../api/cartAPI";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";

function OrderPage() {
  const params = window.location.search;
  const searchParams = new URLSearchParams(params);
  const urlPay = searchParams
    ? {
        vnp_Amount: searchParams.get("vnp_Amount"),
        vnp_BankCode: searchParams.get("vnp_BankCode"),
        vnp_BankTranNo: searchParams.get("vnp_BankTranNo"),
        vnp_CardType: searchParams.get("vnp_CardType"),
        vnp_OrderInfo: searchParams.get("vnp_OrderInfo"),
        vnp_PayDate: searchParams.get("vnp_PayDate"),
        vnp_ResponseCode: searchParams.get("vnp_ResponseCode"),
        vnp_TmnCode: searchParams.get("vnp_TmnCode"),
        vnp_TransactionNo: searchParams.get("vnp_TransactionNo"),
        vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus"),
        vnp_TxnRef: searchParams.get("vnp_TxnRef"),
        vnp_SecureHash: searchParams.get("vnp_SecureHash"),
      }
    : {};

  const today = new Date();
  const yyyy = today.getFullYear();
  const dd = today.getDate() < 9 ? "0" + today.getDate() : today.getDate();
  const mm = today.getMonth() + 1 < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;

  const Username = useSelector((state) => state.user.current.username);
  const history = useHistory();

  const dataExportInvoice = (data) => {
    return {
      SoLuongXuat: data.SLSP,
      NgayLapHDX: yyyy + "" + mm + "" + dd,
      TrangThaiHD: 1, // Da thanh toan: 1, Chua thanh toan: -1, Dang xac nhan: 0
      MaKH: "1",
      MaSP: data.MaSP,
      MaKhoHang: "1",
      vnp_TransactionNo: searchParams.get("vnp_TransactionNo"),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (urlPay) {
          var i = 0;
          const dta = await vnPayAPI.getData(urlPay);
          if (dta.code === "00") {
            const dataProductCart = await cartAPI.findAll(Username);
            console.log(dataProductCart);
            for (i = 0; i < dataProductCart.length; i++) {
              await exportInvoiceAPI.create(dataExportInvoice(dataProductCart[i]));
            }
            setTimeout(() => {}, 1000);
            await cartAPI.DeleteAll(Username);
            history.push("/order");
            console.log(urlPay);
          }
        } else return;
        // return <Redirect to="/order" />
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container_orderpage">
      <div>
        <h2>HÓA ĐƠN CỦA BẠN</h2>
        <div>
          <Row>
            <Col>tên khách hàng</Col>
            <Col>địa chỉ</Col>
            <Col>sdt</Col>
            <Col>email</Col>
            <Col>Tên sản phẩm - số lượng</Col>
            <Col>giá</Col>
            <Col>trang thái đơn hàng</Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
