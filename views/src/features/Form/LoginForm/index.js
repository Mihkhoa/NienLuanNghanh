import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import md5 from "md5";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import { login } from "../../../store/userSlide";
import "./loginform.css";



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

  const Role = useSelector((state) => state.user.current.role);

  const dispatch = useDispatch();

  const urlproduct = localStorage.getItem("urlproduct");

  const dataUser = (data) => {
    return {
      username: data.username,
      password: md5(data.password)
    }
  }

  const onSubmit = async (data) => {
    try {
      unwrapResult(dispatch(await login(dataUser(data))));
    } catch (err) {
      console.log(err);
    }
  };

  if (Role === "ADMIN") {
    return <Redirect to="/manage" />
  }

  if (Role === "USER") {
    if (urlproduct) {
      localStorage.removeItem("urlproduct");
      return <Redirect to={urlproduct} />;
    } else {
      return <Redirect to="/products" />;
    }
  }

  const viewpass = (key) => {
    document.getElementById("password").type = "text";

    document.getElementsByClassName("viewpass")[key].style.display = "block";
    document.getElementsByClassName("hidenpass")[key].style.display = "none";
  };

  const hidenpass = (key) => {
    document.getElementById("password").type = "password";

    document.getElementsByClassName("viewpass")[key].style.display = "none";
    document.getElementsByClassName("hidenpass")[key].style.display = "block";
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field_form">
          <div className="icon">
            <UserOutlined style={{fontSize: "35px"}} />
          </div>
          <input name="username" placeholder="Nhập số điện thoại" {...register("username")} />
          <div className="input_error">{errors.username?.message}</div>
        </div>

        <div className="field_form">
          <div className="icon">
            <LockOutlined style={{fontSize: "35px"}} />
          </div>
          <input id="password" name="password" placeholder="Nhập mật khẩu" type="password" {...register("password")} />
          <div className="input_error">{errors.password?.message}</div>
          <div className="passwd viewpass" onClick={() => hidenpass(0)}>
            <EyeOutlined style={{fontSize: "20px"}} />
          </div>
          <div className="passwd hidenpass" onClick={() => viewpass(0)}>
            <EyeInvisibleOutlined style={{fontSize: "20px"}} />
          </div>
        </div>

        <div className="btn_login">
          <button type="submit">Đăng Nhập</button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
