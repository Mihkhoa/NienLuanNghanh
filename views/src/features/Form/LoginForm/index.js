import "./loginform.css";
import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
// import {notification} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";
import {login} from "../../../store/userSlide";

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên tài khoản"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Notification
  // const [api, contextHolder] = notification.useNotification();

  // const successNotification = (placement) => {
  //   api.success({
  //     top: "105px",
  //     message: `Đăng nhập thành công!`,
  //     placement,
  //   });
  // };

  // const errorNotification = (placement) => {
  //   api.error({
  //     top: "105px",
  //     message: `Đăng nhập không thành công!`,
  //     placement,
  //   });
  // };

  const Role = useSelector((state) => state.user.current.role);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      unwrapResult(dispatch(await login(data)));
    } catch (err) {
      console.log(err);
    }
  };

  if (Role === "ADMIN") {
    return <Redirect to="/manage" />;
  }
  if(Role === "USER") {
    return <Redirect to="/products" />
  }

  return (
    <div>
      {/* {contextHolder} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field_form">
          <div className="icon">
            <UserOutlined style={{fontSize: "35px"}} />
          </div>
          <input
            name="username"
            placeholder="Username"
            {...register("username")}
          />
          <div className="input_error">{errors.username?.message}</div>
        </div>

        <div className="field_form">
          <div className="icon">
            <LockOutlined style={{fontSize: "35px"}} />
          </div>
          <input
            name="password"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <div className="input_error">{errors.password?.message}</div>
        </div>

        <div className="btn_login">
          <button type="submit">Đăng Nhập</button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
