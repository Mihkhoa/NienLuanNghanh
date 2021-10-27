import "./header.css";
import React from "react";

import {UserOutlined} from "@ant-design/icons";
import {Badge, Menu, Dropdown} from "antd";

import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/userSlide";

function Header() {

  const isLogin = useSelector((state) => state.user.current.username);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.current.role);

  const history = useHistory();

  const Logout = () => {
    dispatch(logout());
    history.push("/");
  };
  const menuUser = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/profile">Hồ sơ</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to="/order">Đơn hàng</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={Logout}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  const menuAdmin = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={Logout}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="header__menu">
        <div>
          {isAuth === "ADMIN" ? (
            <span>
              <NavLink className="logo" to="/manage">
                SHOPSHOSE
              </NavLink>
            </span>
          ) : (
            <span>
              <NavLink className="logo" to="/">
                SHOPSHOSE
              </NavLink>
            </span>
          )}
        </div>
        {isAuth === "ADMIN" ? (
          <>
            <div>
              <NavLink to="/manage">MANAGE</NavLink>
            </div>
          </>
        ) : (
          <>
            <div>
              <NavLink to="/">TRANG CHỦ</NavLink>
            </div>
            <div>
              <NavLink to="/products">SẢN PHẨM</NavLink>
            </div>
            <div>
              <NavLink to="/sales">KHUYỄN MÃI</NavLink>
            </div>
          </>
        )}
      </div>
      {!!!isLogin && (
        <>
          <div className="header__account">
            <div>
              <NavLink to="/register">ĐĂNG KÝ</NavLink>
            </div>
            <div>
              <NavLink to="/login">ĐĂNG NHẬP</NavLink>
            </div>
          </div>
        </>
      )}

      {!!isLogin && (
        <>
          {isAuth === "USER" ? (
            <>
              <div className="header_user">
                <div>
                  <NavLink to="/cart">
                    <Badge status="error" count={0}>
                      <ion-icon name="cart-outline"></ion-icon>
                    </Badge>
                  </NavLink>
                </div>
                <div>
                  <Dropdown
                    overlay={menuUser}
                    trigger={["click"]}
                    placement="bottomCenter"
                  >
                    <span
                      href="#"
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <UserOutlined style={{fontSize: "28px", color: "#fff"}} />
                    </span>
                  </Dropdown>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {isAuth === "ADMIN" ? (
            <>
              <div className="header_user">
                <div></div>
                <div>
                  <Dropdown
                    overlay={menuAdmin}
                    trigger={["click"]}
                    placement="bottomCenter"
                  >
                    <span
                      href="#"
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <UserOutlined style={{fontSize: "28px", color: "#fff"}} />
                    </span>
                  </Dropdown>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
