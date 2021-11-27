import "./style_orderpage.css";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Row, Col} from "antd";
import {useHistory} from "react-router-dom";

import vnPayAPI from "../../api/vnpayAPI";
import cartAPI from "../../api/cartAPI";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";
import ChiTietHoaDonXuatAPI from "../../api/chitiethoadonxuatAPI";
import KhachHangAPI from "../../api/khachhangAPI";

function OrderPage() {
  const [dataKhachHang, setDataKhachHang] = useState([]);

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

  const dataHoaDonXuat = (data) => {
    return {
      NgayLapHDX: yyyy + "" + mm + "" + dd,
      TrangThaiHD: 1, // Da thanh toan: 1, Chua thanh toan: -1, Dang xac nhan: 0
      MaKH: "1",
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

  const [dataOrder, setDataOrder] = useState("");
  const [data, setData] = useState([]);
  const [sumorder, setSumorder] = useState("");

  const formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (urlPay) {
        //   const data = await vnPayAPI.getData(urlPay);
        //   if (data.code === "00") {
        const dataProductCart = await cartAPI.findAll(Username);
        //     await exportInvoiceAPI.create(dataHoaDonXuat(dataProductCart));
        //     const MaHDX = await exportInvoiceAPI.findMaHDX();
        //     for(i; i < dataProductCart.length; i++){
        //       await ChiTietHoaDonXuatAPI.create(dataChiTietHDX(dataProductCart[i], MaHDX[0].MaHDX))
        //     }
        //     setTimeout(() => {}, 1000);
        //     history.push("/order");
        //     await cartAPI.DeleteAll(Username);
        //   }
        // } else return;
        const dataKhachHang = await KhachHangAPI.findAll(Username);
        setDataKhachHang(dataKhachHang[0]);
        const data2 = await exportInvoiceAPI.findMaKH(dataKhachHang[0].MaKH);
        setData(data2);
        let i = 0;
        for (i; i < data2.length; i++) {
          const data4 = await ChiTietHoaDonXuatAPI.sumOrder(data2[i].MaHDX);
          if (data4) {
            setSumorder((sumorder) => [...sumorder, data4]);
          }
          const data3 = await ChiTietHoaDonXuatAPI.findMHD(data2[i].MaHDX);
          if (data3) {
            setDataOrder((dataOrder) => [...dataOrder, data3]);
          }
        }
        // const MaHDX = await exportInvoiceAPI.findMaHDX();
        // console.log(MaHDX);
        // const data = await ChiTietHoaDonXuatAPI.findMHD(MaHDX[0].MaHDX);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(dataOrder)

  return (
    <div className="container_orderpage">
      <div>
        <h2>HÓA ĐƠN CỦA BẠN</h2>
        {!!dataKhachHang ? (
          <Row>
            <Col span={16}>
              {!!dataOrder &&
                dataOrder.map((items, i) => {
                  return (
                    <div className="item_order" key={i}>
                      <div>
                        {data[i].TinhTrangHD === 0 ? (
                          <p>
                            <i>Đang giao hàng</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {data[i].TinhTrangHD === 1 ? (
                          <p>
                            <i>Đã giao hàng</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {data[i].TinhTrangHD === 3 ? (
                          <p>
                            <i>Hủy</i>
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div key={i}>
                        {items.map((subItems, index) => {
                          return (
                            <div key={index}>
                              <Row>
                                <Col span={16}>{subItems.TenSP}</Col>
                                <Col span={2}>x{subItems.SoLuongXuat}</Col>
                                <Col span={6}>{formatNumber.format(subItems.GiaSPX)}</Col>
                              </Row>      
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <strong>Tổng hóa đơn: </strong> {sumorder[i][0].SUM_ORDER ? formatNumber.format(sumorder[i][0].SUM_ORDER) : <></>}
                      </div>
                    </div>
                  );
                })}
            </Col>
            <Col span={8}>
              <div className="info_profile">
                <p>
                  <strong>Tên khách hàng:</strong> {dataKhachHang.TenKH}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {dataKhachHang.SDT}
                </p>
                <p>
                  <strong>Email:</strong> {dataKhachHang.Email}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {dataKhachHang.DiaChi}
                </p>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <p>BẠN CHƯA CÓ HÓA ĐƠN NÀO</p>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
