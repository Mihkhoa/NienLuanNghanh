import "./style_profilepage.css";
import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import KhachHangAPI from "../../api/khachhangAPI";
import {useSelector} from "react-redux";
import {Input, Button, Form} from "antd";

function ProfilePage() {
  const {TabPane} = Tabs;
  const [dataKhachHang, setDataKhachHang] = useState("");

  const Username = useSelector((state) => state.user.current.username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await KhachHangAPI.findAll(Username);
        setDataKhachHang(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Username]);

  const dataKH = (data) => {
    return {
      TenKH: data.TenKH,
      SDT: data.SDT,
      DiaChi: data.DiaChi,
      Email: data.Email,
      Username: Username,
    };
  };

  const updateForm = async (values) => {
    await KhachHangAPI.updateKhacHang(dataKH(values));
    window.location.reload();
  };

  const addForm = async (values) => {
    await KhachHangAPI.create(dataKH(values));
    window.location.reload();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container_profile">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông Tin Khách Hàng" key="1">
          <div className="form_profile">
            {!!dataKhachHang && (
              <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 10,
              }}
              onFinish={updateForm}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                TenKH: dataKhachHang.TenKH,
                SDT: dataKhachHang.SDT,
                DiaChi: dataKhachHang.DiaChi,
                Email: dataKhachHang.Email,
              }}
            >
              <Form.Item label="Tên khách hàng" name="TenKH" rules={[{required: true, message: "Vui lòng nhập tên khách hàng!"}]}>
                <Input />
              </Form.Item>
        
              <Form.Item label="Số điện thoại" name="SDT" rules={[{required: true, message: "Vui lòng nhập số điện thoại!"}]}>
                <Input />
              </Form.Item>
        
              <Form.Item label="Địa chỉ" name="DiaChi" rules={[{required: true, message: "Vui lòng nhập địa chỉ!"}]}>
                <Input />
              </Form.Item>
        
              <Form.Item label="Email" name="Email">
                <Input />
              </Form.Item>
        
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập Nhật
                </Button>
              </Form.Item>
            </Form>
            )}
          </div>
        </TabPane>
        <TabPane tab="Thêm Thông Tin Khách Hàng" key="2">
          <div>
            {!dataKhachHang && (
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 10,
                }}
                onFinish={addForm}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Tên khách hàng" name="TenKH" rules={[{required: true, message: "Vui lòng nhập tên khách hàng!"}]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="SDT" rules={[{required: true, message: "Vui lòng nhập số điện thoại!"}]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Địa chỉ" name="DiaChi" rules={[{required: true, message: "Vui lòng nhập địa chỉ!"}]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Email" name="Email">
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Thêm
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
