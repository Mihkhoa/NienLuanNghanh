import React from "react";
import BG_Login from "../../assets/images/BackgroundLogin.png";
import FormLogin from "../Form/LoginForm";
import "./login.css";

function LoginPage() {
  return (
    <div className="login">
      <img src={BG_Login} alt="background_form" />
      <div className="form">
        <div className="form_login">
          <h4>ĐĂNG NHẬP</h4>
          <FormLogin />
          {/* <div className="forgot_password">
            <p>Quên mật khẩu ?</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
