import "./login.css";
import React from "react";
import FormLogin from "../Form/LoginForm";
import BG_Login from "../../assets/images/BackgroundLogin.png";

function LoginPage() {

  return (
    <div className="login">
      <img src={BG_Login} alt="background_form" />
      <div className="form">
        <div className="form_login">
          <h4>ĐĂNG NHẬP</h4>
          <FormLogin />
          <div className="forgot_password">
            <p>Quên mật khẩu ?</p>
          </div>
          <hr />
          <div className="login_account">
            <h4>Đăng nhập với</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
