import React, {useEffect, useState} from "react";
import "./addProductForm.css";
import {Form, Input, Select, Button, Row, Col} from "antd";
import PropTypes from "prop-types";

import productAPI from "../../../api/productAPI";
import importIncoiceAPI from "../../../api/importInvoice";
import tradeMarkAPI from "../../../api/tradeMarkAPI";
import SizeAPI from "../../../api/sizeAPI";

EditProductForm.propTypes = {
  DataSP: PropTypes.object,
};

function EditProductForm(props) {
  const {Option} = Select;

  const [thuonghieu, setThuonghieu] = useState([]);
  const [size, setSize] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data2 = await tradeMarkAPI.getAll();
        setThuonghieu(data2);
        const data3 = await SizeAPI.getAll();
        setSize(data3);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const dataProduct = (data) => {
    return {
      MaSP: data.MaSP,
      TenSP: data.TenSP,
      GiaSPX: data.GiaSPX,
      MaTH: data.MaTH,
      MaLSP: data.MaLSP,
      MaKT: data.KichCo,
      ThongTinSP: data.ThongTinSP,
    };
  };

  const dataInvoice = (data) => {
    return {
      SoLuongNhap: data.SLSP,
      GiaSPN: data.GiaSPN,
      MaKhoHang: data.KhoHang,
      MaSP: data.MaSP,
    };
  };

  const checkMaSP = async (data) => {
    if (!data) return;
    try {
      const respone = await productAPI.findOne(data);
      if (respone.length === 1) {
        document.getElementsByClassName("errors")[1].innerText = "Mã sản phẩm đã tồn tại";
      } else {
        document.getElementsByClassName("errors")[1].innerText = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    await productAPI.update(dataProduct(data));
    await importIncoiceAPI.update(dataInvoice(data));
    window.location.reload();
  };

  const dataForm = {
    GiaSPN: props.DataSP.GiaSPN,
    GiaSPX: props.DataSP.GiaSPX,
    KhoHang: "1",
    KichCo: props.DataSP.MaKT,
    MaLSP: props.DataSP.MaLSP,
    MaSP: props.DataSP.MaSP,
    MaTH: props.DataSP.MaTH,
    SLSP: props.DataSP.SoLuongNhap,
    TenSP: props.DataSP.TenSP,
    ThongTinSP: props.DataSP.ThongTinSP,
  };

  const datathuonghieu =
    !!thuonghieu &&
    thuonghieu.map(({MaTH, TenTH}, i) => (
      <Select.Option key={i} value={MaTH}>
        {TenTH}
      </Select.Option>
    ));

  const datasize =
    !!size &&
    size.map(({ID, KichThuocSP}, i) => (
      <Select.Option key={i} value={ID}>
        {KichThuocSP}
      </Select.Option>
    ));

  return (
    <div>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onSubmit}
        autoComplete="off"
        initialValues={dataForm}
      >
        <Form.Item label="Kho Hàng" name="KhoHang">
          <Select>
            <Option value="1">Kho Hàng Cần Thơ</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mã Sản Phẩm" name="MaSP">
          <Input
            onBlur={(e) => {
              checkMaSP(e.target.value);
            }}
          />
        </Form.Item>
        <div className="errors"></div>

        <Form.Item label="Tên Sản Phẩm" name="TenSP">
          <Input />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Loại Sản Phẩm"
              name="MaLSP"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 12,
              }}
            >
              <Select>
                <Option value="LSP01">Giày</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kích Cỡ"
              name="KichCo"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
            >
              <Select>
                {datasize}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Thương Hiệu"
              name="MaTH"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 12,
              }}
            >
              <Select>
                {datathuonghieu}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số Lượng"
              name="SLSP"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Giá Nhập" name="GiaSPN">
          <Input />
        </Form.Item>

        <Form.Item label="Giá Bán" name="GiaSPX">
          <Input />
        </Form.Item>

        <Form.Item label="Thông Tin SP" name="ThongTinSP">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProductForm;
