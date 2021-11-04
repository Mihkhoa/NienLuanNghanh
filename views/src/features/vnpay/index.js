import React, { useState } from 'react';
import "./style_vnpay.css";
import { Button } from 'antd';
import vnPayAPI from '../../api/vnpayAPI';

function Payment() {

  const [payUrl, setPayUrl] = useState("");

  const data = {
    orderType: 'billpayment',
    amount: '10330000',
    orderDescription: 'thanh toan hoa don',
    bankCode: 'SACOMBANK',
    language: 'vn',
  }

  const pay = async () => {
  const payUrl = await vnPayAPI.create(data);
  setPayUrl(payUrl);
  console.log(payUrl);
  //  const datas = await vnPayAPI.getData();
  //  console.log(datas)
  // const payInfo = await vnPayAPI.getData(data);
  // console.log(payInfo);
  }

  return (
    <div className="container_vnpay">
      <Button type="primary" onClick={pay}>THANH TOÁN</Button>
    </div>
  );
}

export default Payment;