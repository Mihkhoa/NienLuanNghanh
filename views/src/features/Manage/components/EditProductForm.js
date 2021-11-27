import React, {useEffect, useState} from "react";
import "./addProductForm.css";
import moment from "moment";
import {Form, Input, Select, Button, Row, Col} from "antd";
import PropTypes from "prop-types";

import productAPI from "../../../api/productAPI";
import importIncoiceAPI from "../../../api/importInvoice";
import imageAPI from "../../../api/imageAPI";
import {useParams} from "react-router";

EditProductForm.propTypes = {
  DataSP: PropTypes.object,
};

function EditProductForm(props) {
  const {Option} = Select;

  const [dataSP, setDataSP] = useState([]);

  const dataProduct = (data) => {
    return {
      MaSP: data.masanpham,
      TenSP: data.tensanpham,
      GiaSPX: data.giaban,
      MaTH: data.thuonghieu,
      MaLSP: data.loaisanpham,
      MaKT: data.size,
      ThongTinSP: data.thongtinsanpham,
    };
  };

  const dataInvoice = (data) => {
    return {
      NgayLapHDN: moment().format("YYYY-MM-DD"),
      SoLuongNhap: data.soluong,
      GiaSPN: data.gianhap,
      MaKhoHang: data.khohang,
      MaSP: data.masanpham,
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
    // window.location.reload();
  };

  const dataForm = {
    GiaSPN: props.DataSP.GiaSPN,
    GiaSPX: props.DataSP.GiaSPX,
    KhoHang: "1",
    KichCo: undefined,
    MaLSP: props.DataSP.MaLSP,
    MaSP: props.DataSP.MaSP,
    MaTH: props.DataSP.MaTH,
    SLSP: undefined,
    TenSP: props.DataSP.TenSP,
    ThongTinSP: props.DataSP.ThongTinSP,
  };

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
                <Option value="">Kích Cỡ</Option>
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
                <Option value="">Thương Hiệu</Option>
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
