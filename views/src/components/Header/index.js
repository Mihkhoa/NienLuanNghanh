import "./header.css";
import React, {useEffect, useState} from "react";

import {UserOutlined, ShoppingCartOutlined, BellOutlined} from "@ant-design/icons";
import {Badge, Menu, Dropdown} from "antd";

import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/userSlide";
import cartAPI from "../../api/cartAPI";

function Header() {
  const [number, setNumber] = useState("");

  const isLogin = useSelector((state) => state.user.current.username);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.current.role);

  const history = useHistory();

  const Logout = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLogin) return;
        const numberProduct = await cartAPI.sumProduct(isLogin);
        if (numberProduct) {
          setNumber(numberProduct[0].SLSanPham);
        } else {
          setNumber(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isLogin]);
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

  if (number) {
    console.log(number);
  }

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
                {/* <div>
                  <Badge status="error" count={2} overflowCount={10}>
                    <BellOutlined style={{fontSize: "28px", color: "#fff"}} />
                  </Badge>
                </div> */}
                <div>
                  <NavLink to="/cart">
                    <Badge status="error" count={number} overflowCount={10}>
                      <ShoppingCartOutlined style={{fontSize: "28px", color: "#fff"}} />
                    </Badge>
                  </NavLink>
                </div>
                <div>
                  <Dropdown overlay={menuUser} trigger={["click"]} placement="bottomCenter">
                    <span href="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
                  <Dropdown overlay={menuAdmin} trigger={["click"]} placement="bottomCenter">
                    <span href="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
