import "./registerform.css";
import React from "react";
import {useHistory} from "react-router-dom";

import * as yup from "yup";
import {useForm} from "react-hook-form";

import {LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import userAPI from "../../../api/userAPI";
import {notification} from "antd";

let schema = yup.object().shape({
  username: yup.string().min(5, "Tên tài khoản phải lớn hơn 5 ký tự").required("Vui lòng nhập tên tài khoản"),
  password: yup.string().min(5, "Mật khẩu phải lớn hơn 5 ký tự").required("Vui lòng nhập mật khẩu"),
  confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Notification
  const [api, contextHolder] = notification.useNotification();

  const successNotification = () => {
    api.success({
      top: "105px",
      message: `Đăng ký thành công!`,
    });
  };

  const errorNotification = () => {
    api.error({
      top: "105px",
      message: `Tên tài khoản đã tồn tại!`,
    });
  };

  const history = useHistory();

  const onSubmit = async (data) => {
    const findUser = await userAPI.findUser(data);
    if (!findUser) {
      await userAPI.register(data);
      successNotification();
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    } else {
      errorNotification();
    }
  };

  const viewpass = (key) => {
    if(key === 0){
      document.getElementById("password").type = "text";
    }else{
      document.getElementById("confirmpassword").type = "text";
    }
    document.getElementsByClassName("viewpass")[key].style.display = "block";
    document.getElementsByClassName("hidenpass")[key].style.display = "none";
  }

  const hidenpass = (key) => {
    if(key === 0){
      document.getElementById("password").type = "password";
    }else{
      document.getElementById("confirmpassword").type = "password";
    }
    document.getElementsByClassName("viewpass")[key].style.display = "none";
    document.getElementsByClassName("hidenpass")[key].style.display = "block";
  }


  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field_form">
          <div className="icon">
            <UserOutlined style={{fontSize: "35px"}} />
          </div>
          <input name="username" placeholder="Username" {...register("username")} />
          <div className="input_error">{errors.username?.message}</div>
        </div>

        <div className="field_form">
          <div className="icon">
            <LockOutlined style={{fontSize: "35px"}} />
          </div>
          <input id="password" name="password" placeholder="Password" type="password" {...register("password")} />
          <div className="input_error">{errors.password?.message}</div>
          <div className="passwd viewpass" onClick={() => hidenpass(0)}><EyeOutlined style={{fontSize: "20px"}} /></div>
          <div className="passwd hidenpass" onClick={() => viewpass(0)}><EyeInvisibleOutlined style={{fontSize: "20px"}} /></div>
        </div>

        <div className="field_form">
          <div className="icon">
            <LockOutlined style={{fontSize: "35px"}} />
          </div>
          <input id="confirmpassword" name="confirmpassword" placeholder="Confirm password" type="password" {...register("confirmpassword")} />
          <div className="input_error">{errors.confirmpassword?.message}</div>
          <div className="passwd viewpass" onClick={() => hidenpass(1)}><EyeOutlined style={{fontSize: "20px"}} /></div>
          <div className="passwd hidenpass"  onClick={() => viewpass(1)}><EyeInvisibleOutlined style={{fontSize: "20px"}} /></div>
        </div>

        <div className="btn_register">
          <button type="submit">Đăng Ký</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
