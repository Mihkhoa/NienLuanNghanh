import "./style_productpage.css";
import React, {useEffect, useState} from "react";
import {Input, Select} from "antd";
import {NavLink} from "react-router-dom";

import productAPI from "../../api/productAPI";

function MainProductPage() {
  const {Search} = Input;
  const {Option} = Select;
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const data = await productAPI.getInnerJoinImage();
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  var formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const onSearch = async (value) => {
    if (!value) {
      window.location.reload();
      return;
    }
    console.log(value);
    const data = await productAPI.searchProduct(value);
    if (!data) return;
    setProductData(data);
  };

  const sortByProduct = async (sortby) => {
    if (!sortby) return;
    const data = await productAPI.sortByProduct(sortby);
    setProductData(data);
  };

  const selectTradeMark = async (TenTH) => {};

  return (
    <div className="container_productpage">
      <div className="filter_product">
        <div className="tags"></div>
        <br />
        <div className="search">
          <Search placeholder="Tìm Kiếm" onSearch={onSearch} enterButton />
        </div>
        <br />
        <div>
          <Select
            placeholder="Sắp Xếp"
            style={{width: 255}}
            onChange={sortByProduct}
          >
            <Option value="ASC">Giá tăng dần</Option>
            <Option value="DESC">Giá thấp dần</Option>
          </Select>
        </div>
        <br />
        <div>
          <Select
            placeholder="Thương Hiệu"
            style={{width: 255}}
            onChange={selectTradeMark}
          >
            <Option value="TH001">Giá tăng dần</Option>
            <Option value="TH002">Giá thấp dần</Option>
          </Select>
        </div>
      </div>
      <div className="list_product">
        {!!productData &&
          productData.map(({MaSP, TenSP, HinhAnhSP, GiaSPX}, i) => (
            <div className="item_product" key={i}>
              <NavLink to={"/product/"+MaSP}>
                <div>
                  <img
                    className="image_product"
                    src={HinhAnhSP.slice(12, HinhAnhSP.length)}
                    alt="sản phẩm"
                  />
                </div>
                <div>
                  <h3 className="title_product">{TenSP}</h3>
                </div>
                <div className="price_product">
                  {formatNumber.format(GiaSPX)}
                </div>
                <div className="btn_buyproduct">
                  <button className="btn_buynow">
                    <span>MUA NGAY</span>
                  </button>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MainProductPage;