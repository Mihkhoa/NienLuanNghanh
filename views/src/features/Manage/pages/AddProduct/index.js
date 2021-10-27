import "../../manage.css";
import "./addProduct.css";
import React, {useEffect, useState} from "react";
import FormAddProduct from "../../components/AddProductForm";
import TradeMark from "../../../../api/tradeMarkAPI";
import Size from "../../../../api/sizeAPI";

const AddProducts = () => {
  const [trademark, setTrademark] = useState([]);
  const [size, setSize] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trademark = await TradeMark.getAll();
        setTrademark(trademark);
        const size = await Size.getAll();
        setSize(size);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div></div>
        <div className="product_add">
          <h2>THÊM SẢN PHẨM</h2>
          <FormAddProduct tradeMark={trademark} size={size} />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
