import "./style_infoproduct.css";
import React, {useEffect, useState} from "react";
import {useRouteMatch, useParams} from "react-router-dom";
import imageAPI from "../../api/imageAPI";
import productAPI from "../../api/productAPI";

function InfoProduct() {
  const match = useRouteMatch();
  console.log(match.url);
  const {MaSP} = useParams();
  console.log(MaSP);

  const [dataProduct, setDataProduct] = useState([]);
  const [urlImage, setUrlImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productAPI.findOne(MaSP);
        setDataProduct(data[0])
        console.log(data);
        const ulrImage = await imageAPI.findOne(MaSP);
        setUrlImage(
          ulrImage[0].HinhAnhSP.slice(12, ulrImage[0].HinhAnhSP.length),
        );
        console.log(ulrImage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  var formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="conatiner_infoproduct">
      <div className="wrap">
        <div className="img_product">
          <img src={urlImage} alt="hinh anh san pham" />
        </div>
        <div className="infoproduct">
          <span className="title_product">{dataProduct.TenSP}</span>
          <span className="price_product">{formatNumber.format(dataProduct.GiaSPX)}</span>
          <span className="size"></span>
          <div>
            <button className="btn btn_addcart">THÊM VÀO GIỎ HÀNG</button>
            <button className="btn btn_buy">MUA NGAY</button>
          </div>
          <div className="box_promotion">
            <span>KHUYỄN MÃI KHI MUA HÀNG</span>
            <span>- Miễn phí ship hàng toàn quốc cho đơn hàng trên 2 triệu.</span> <br />
            <span>- Với đơn hàng dưới 2 triệu, phí ship đồng giá 30k.</span> <br />
            <span>- Double Box kèm chống sốc khi giao hàng</span> <br />
            <span>- Giao hàng nhanh 60 phút trong nội thành Hà Nội</span> <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoProduct;
