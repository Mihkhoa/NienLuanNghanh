import "../../manage.css";
import "./listProducts.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Modal, Table, Space, Button, Row, Col} from "antd";
import {FormOutlined, DeleteOutlined, ExclamationCircleOutlined, ProfileOutlined} from "@ant-design/icons";

import productAPI from "../../../../api/productAPI";
import productType from "../../../../api/productTypeAPI";
import tradeMarkAPI from "../../../../api/tradeMarkAPI";
import imageAPI from "../../../../api/imageAPI";
import EditProductForm from "../../components/EditProductForm";

const ListProducts = () => {
  const {confirm} = Modal;
  const history = useHistory();
  const [dataProduct, setDataProduct] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const [editModal, setEditModal] = useState();
  const [infoProduct, setInfoProduct] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const [nameTH, setNameTH] = useState([]);
  const [name, setName] = useState([]);
  const [urlImage, setUrlImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data1 = await productAPI.getInnerJoinTrademark();
        setDataProduct(data1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const getName = async (MaLSP, MaTH) => {
    const data1 = await productType.innerJoinWareHouse(MaLSP);
    const data2 = await tradeMarkAPI.findOne(MaTH);
    setName(data1[0]);
    setNameTH(data2[0]);
  };

  const getUrlImage = async (MaSP) => {
    const url = await imageAPI.findOne(MaSP);
    setUrlImage(url[0].HinhAnhSP.slice(12, url[0].HinhAnhSP.length));
  };

  const infoModalProduct = (key) => {
    setInfoModal(true);
    setInfoProduct(dataProduct[key]);
    getName(dataProduct[key].MaLSP, dataProduct[key].MaTH);
    getUrlImage(dataProduct[key].MaSP);
  };

  const editModalProduct = (key) => {
    setEditModal(true);
    setEditProduct(dataProduct[key]);
    getName(dataProduct[key].MaLSP, dataProduct[key].MaTH);
  };

  const cancelModal = () => {
    window.location.reload();
    setEditModal(false);
  };

  const showConfirm = (MaSP, TenSP) => {
    confirm({
      title: "X??A S???N PH???M",
      icon: <ExclamationCircleOutlined />,
      content: `S???n ph???m ${TenSP} s??? b??? x??a v?? kh??ng th??? ph???c h???i!`,
      onOk() {
        deleteProduct(MaSP);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteProduct = async (MasP) => {
    if (!MasP) return;
    await productAPI.delete(MasP);
    history.go(0);
  };

  const onSubmit = async (data) => {
    console.log(data);
    setEditModal(false);
  };

  const columns = [
    {
      title: "M?? S???N PH???M",
      dataIndex: "masanpham",
      key: "masanpham",
      width: "10%",
      align: "center",
    },
    {
      title: "T??N S???N PH???M",
      dataIndex: "tensanpham",
      key: "tensanpham",
      width: "20%",
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
      width: "5%",
      align: "center",
    },
    {
      title: "S??? L?????NG NH???P",
      dataIndex: "soluongnhap",
      key: "soluongnhap",
      width: "15%",
      align: "center",
    },
    {
      title: "GI?? NH???P",
      dataIndex: "gianhap",
      key: "gianhap",
      width: "10%",
      align: "center",
    },
    {
      title: "GI?? B??N",
      dataIndex: "giaban",
      key: "giaban",
      width: "10%",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (text, record) => (
        <div className="btn_actions">
          <Space size="middle" align="center">
            <Button type="default" onClick={() => infoModalProduct(record.key)}>
              <ProfileOutlined />
            </Button>
            <Modal title={infoProduct.TenSP} style={{top: 120}} visible={infoModal} onOk={() => setInfoModal(false)} onCancel={() => setInfoModal(false)} footer={null} width={1000}>
              <Row>
                <Col span={8}>
                  <img className="productimage" src={urlImage} alt="???nh s???n ph???m" />
                </Col>
                <Col span={16}>
                  <Row>
                    <Col span={12}>
                      M?? s???n ph???m: <strong>{infoProduct.MaSP}</strong>
                    </Col>
                    <Col span={12}>
                      Lo???i s???n ph???m: <strong>{name.TenLSP}</strong>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={12}>
                      Kho h??ng: <strong>{name.TenKhoHang}</strong>
                    </Col>
                    <Col span={12}>
                      Th????ng hi???u: <strong>{nameTH.TenTH}</strong>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={12}>
                      S??? l?????ng nh???p: <strong>{infoProduct.SoLuongNhap}</strong>
                    </Col>
                    <Col span={12}>
                      Ng??y nh???p s???n ph???m: <strong>{moment.utc(infoProduct.NgayLapHDN).format("MM/DD/YYYY")}</strong>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={12}>
                      Gi?? nh???p s???n ph???m:{" "}
                      <strong>
                        {infoProduct.GiaSPN} <u>??</u>
                      </strong>
                    </Col>
                    <Col span={12}>
                      Gi?? b??n s???n ph???m:{" "}
                      <strong>
                        {infoProduct.GiaSPX} <u>??</u>
                      </strong>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={24}>
                      Th??ng tin s???n ph???m:
                      <strong> {infoProduct.ThongTinSP}</strong>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>

            <Button type="primary" onClick={() => editModalProduct(record.key, record.masanpham, record.size)}>
              <FormOutlined />
            </Button>
            <Modal title="S???A S???N PH???M" style={{top: 50}} visible={editModal} onOk={() => onSubmit()} onCancel={() => cancelModal()} footer={null} width={650}>
              <EditProductForm DataSP={editProduct} />
            </Modal>

            <Button
              type="primary"
              onClick={() => {
                showConfirm(record.masanpham, record.tensanpham);
              }}
              danger
            >
              <DeleteOutlined />
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const data = dataProduct?.map(({MaSP, TenSP, GiaSPX, SoLuongNhap, GiaSPN, KichThuocSP}, i) => ({
    key: `${i}`,
    masanpham: `${MaSP}`,
    tensanpham: `${TenSP}`,
    size: `${KichThuocSP}`,
    soluongnhap: `${SoLuongNhap}`,
    gianhap: `${GiaSPN}`,
    giaban: `${GiaSPX}`,
    action: `${MaSP}`,
  }));

  return (
    <div className="container">
      <div></div>
      <div className="product_list">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ListProducts;
