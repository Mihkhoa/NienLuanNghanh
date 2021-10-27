import "./register.css";
import React from "react";
import RegisterForm from "../Form/RegisterForm";
import BackgroundRegister from "../../assets/images/BackgroundRegister.png";

function Register() {
  return (
    <div className="register">
      <img src={BackgroundRegister} alt="Background Register" />
      <div className="form">
        <div className="form_register">
          <h4>ĐĂNG KÝ</h4>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
