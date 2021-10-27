import React, {useState} from "react";
import "./addProductForm.css";
import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import productAPI from "../../../api/productAPI";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import importIncoiceAPI from "../../../api/importInvoice";
import imageAPI from "../../../api/imageAPI";

FormAddProduct.propTypes = {
  tradeMark: PropTypes.array,
  size: PropTypes.array,
};

const schema = yup.object({
  khohang: yup.string(),
  masanpham: yup.string().required("Mã sản phẩm không được trống"),
  tensanpham: yup.string().required("Tên sản phẩm không được trống"),
  loaisanpham: yup.string().required("Vui lòng chọn loại sản phẩm"),
  thuonghieu: yup.string().required("Vui lòng chọn thương hiệu"),
  size: yup.string().required("Vui lòng chọn kích cỡ"),
  soluong: yup
    .number()
    .typeError("Vui lòng nhập số lượng")
    .min(1, "Số lượng tối thiểu là 1")
    .required("Vui lòng nhập số lượng"),
  gianhap: yup
    .number()
    .typeError("Vui lòng nhập giá")
    .min(0, "giá phải là số dương")
    .required("Vui lòng nhập giá"),
  giaban: yup
    .number()
    .typeError("Vui lòng nhập giá")
    .min(0, "giá phải là số dương")
    .required("Vui lòng nhập giá"),
});

function FormAddProduct(props) {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");

  const time = new Date();
  const ddmmyyyy = `${time.getFullYear()}-${
    time.getMonth() + 1
  }-${time.getDate()}`;

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await getBase64(file);
    setImageUrl(base64);
    setFile(file);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };

  const dataProduct = (data) => {
    return {
      MaSP: data.masanpham,
      TenSP: data.tensanpham,
      GiaSPX: data.giaban,
      MaTH: data.thuonghieu,
      MaLSP: data.loaisanpham,
      MaKT: data.size,
      ThongTinSP: data.thongtinsanpham,
    };
  };

  const dataInvoice = (data) => {
    return {
      NgayLapHDN: ddmmyyyy,
      SoLuongNhap: data.soluong,
      GiaSPN: data.gianhap,
      MaKhoHang: data.khohang,
      MaSP: data.masanpham,
    };
  };

  const dataImage = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("MaSP", data.masanpham);
    return formData;
  };

  const checkMaSP = async (data) => {
    if (!data) return;
    try {
      const respone = await productAPI.findOne(data);
      if (respone.length === 1) {
        document.getElementsByClassName("errors")[1].innerText =
          "Mã sản phẩm đã tồn tại";
      } else {
        document.getElementsByClassName("errors")[1].innerText = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (!data) return;
    try {
      await productAPI.create(dataProduct(data));
      await importIncoiceAPI.create(dataInvoice(data));
      if (file) {
        await imageAPI.create(dataImage(data));
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const dataTrademark =
    !!props.tradeMark &&
    props.tradeMark.map(({MaTH, TenTH}, i) => (
      <option key={i} value={MaTH}>
        {TenTH}
      </option>
    ));

  const dataSize =
    !!props.size &&
    props.size.map(({ID, KichThuocSP}, i) => (
      <option key={i} value={ID}>
        {KichThuocSP}
      </option>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <div className="title">
            <label>Kho Hàng</label>
          </div>
          <div className="inputField">
            <select {...register("khohang")}>
              <option value="1">Kho hàng Cần Thơ</option>
            </select>
            <span className="errors">{errors.khohang?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">
            <label>Mã Sản Phẩm</label>
          </div>
          <div className="inputField">
            <input
              className="masanpham"
              {...register("masanpham")}
              onBlur={(e) => {
                checkMaSP(e.target.value);
              }}
            />
            <span className="errors">{errors.masanpham?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">
            <label>Tên Sản Phẩm</label>
          </div>
          <div className="inputField">
            <input className="tensanpham" {...register("tensanpham")} />
            <span className="errors">{errors.tensanpham?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">
            <label>Loại Sản Phẩm</label>
          </div>
          <div className="inputField">
            <select className="loaisanpham" {...register("loaisanpham")}>
              <option value="LSP01">Giày</option>
            </select>
            <span className="errors">{errors.loaisanpham?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">
            <label>Kích cỡ</label>
          </div>
          <div className="inputField">
            <select className="size" {...register("size")}>
              <option value="">...</option>
              {dataSize}
            </select>
            <span className="errors">{errors.size?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">Thương Hiệu</div>
          <div className="inputField">
            <select {...register("thuonghieu")}>
              <option value="">...</option>
              {dataTrademark}
            </select>
            <span className="errors">{errors.thuonghieu?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">Hình Ảnh</div>
          <div className="inputField">
            <input
              type="file"
              className="hinhanh"
              id="default-btn"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
            <div className="khunghinhanh" onClick={btnActive}>
              <div>+</div>
              {imageUrl ? (
                <>
                  <img src={imageUrl} alt="anhsanpham" />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="field">
          <div className="title">Số Lượng</div>
          <div className="inputField">
            <input className="soluong" {...register("soluong")} />
            <span className="errors">{errors.soluong?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">Giá Nhập</div>
          <div className="inputField">
            <input className="gianhap" {...register("gianhap")} />
            <span className="errors">{errors.gianhap?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">Giá Bán</div>
          <div className="inputField">
            <input className="giaban" {...register("giaban")} />
            <span className="errors">{errors.giaban?.message}</span>
          </div>
        </div>

        <div className="field">
          <div className="title">
            Thông Tin <br /> Sản Phẩm
          </div>
          <div className="inputField">
            <textarea
              rows="5"
              className="thongtinsanpham"
              {...register("thongtinsanpham")}
            />
            {/* <span className="errors">{errors.thongtinsanpham?.message}</span> */}
          </div>
        </div>

        <div className="field">
          <div></div>
          <div className="inputField">
            <button type="submit">THÊM</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormAddProduct;
