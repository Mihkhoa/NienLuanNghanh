import "./style_productpage.css";
import React, {useEffect, useState} from "react";
import {Input, Select} from "antd";
import {NavLink} from "react-router-dom";

import productAPI from "../../api/productAPI";
import tradeMarkAPI from "../../api/tradeMarkAPI";

function MainProductPage() {
  const {Search} = Input;
  const {Option} = Select;
  const [productData, setProductData] = useState([]);
  const [ThuongHieuData, setThuongHieuData] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const data = await productAPI.getInnerJoinImage();
        setProductData(data);
        const thuonghieu_data = await tradeMarkAPI.getAll();
        setThuongHieuData(thuonghieu_data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
    localStorage.removeItem("sortBy");
    localStorage.removeItem("sortMaTH");
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
    localStorage.setItem("sortBy", sortby);
    const MaTH = localStorage.getItem("sortMaTH");
    if (sortby && MaTH) {
      const data1 = await productAPI.filterMaTH_Sort(sortby, MaTH);
      setProductData(data1);
    } else {
      const data2 = await productAPI.sortByProduct(sortby);
      setProductData(data2);
    }
  };

  const filter_thuonghieu = async (MaTH) => {
    localStorage.setItem("sortMaTH", MaTH);
    const sortby = localStorage.getItem("sortBy");
    if (MaTH && sortby) {
      const data1 = await productAPI.filterMaTH_Sort(sortby, MaTH);
      setProductData(data1);
    } else {
      const data = await tradeMarkAPI.findOne(MaTH);
      setProductData(data);
    }
  };

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
          <Select placeholder="Sắp Xếp" style={{width: 255}} onChange={sortByProduct}>
            <Option value="ASC">Giá tăng dần</Option>
            <Option value="DESC">Giá thấp dần</Option>
          </Select>
        </div>
        <br />
        <div>
          <Select placeholder="Thương Hiệu" style={{width: 255}} onChange={filter_thuonghieu}>
            {ThuongHieuData?.map(({MaTH, TenTH}, i) => (
              <Option key={i} value={MaTH}>
                {TenTH}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="list_product">
        {!!productData ? (
          productData.map(({MaSP, TenSP, HinhAnhSP, GiaSPX}, i) => (
            <div className="item_product" key={i}>
              <NavLink to={"/product/" + MaSP}>
                <div>
                  <img className="image_product" src={HinhAnhSP.slice(12, HinhAnhSP.length)} alt="sản phẩm" />
                </div>
                <div>
                  <h3 className="title_product">{TenSP}</h3>
                </div>
                <div className="price_product">{formatNumber.format(GiaSPX)}</div>
              </NavLink>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MainProductPage;
