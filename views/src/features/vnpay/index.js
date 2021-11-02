import React from 'react';
import "./style_vnpay.css";
import { Button } from 'antd';
import vnPayAPI from '../../api/vnpayAPI';

function Payment() {

  const data = {
    orderType: 'billpayment',
    amount: '100000',
    orderDescription: 'thanh toan hoa don',
    bankCode: 'SACOMBANK',
    language: 'vn',
  }

  const pay = async () => {
   await vnPayAPI.create(data);
  //  const datas = await vnPayAPI.getData();
  //  console.log(datas)
  }

  return (
    <div className="container_vnpay">
      <Button type="primary" onClick={pay}>THANH TOÁN</Button>
    </div>
  );
}

export default Payment;