import "../../manage.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Doughnut, Line} from "react-chartjs-2";

import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";
import importIncoiceAPI from "../../../../api/importInvoice";
import chitiethoadonxuatAPI from "../../../../api/chitiethoadonxuatAPI";

const MainPage = () => {
  const [dataHDX, setDataHDX] = useState([]);
  const [sumGiaSPN, setSumGiaSPN] = useState([]);
  const [sumGiaSPX, setSumGiaSPX] = useState([]);
  const [topProduct, setTopProduct] = useState([]);

  const date = (day) => {
    return moment().add(day, "days").format("YYYY-MM-DD");
  };

  const date_vn = (day) => {
    return moment().add(day, "days").format("DD-MM-YYYY");
  };

  useEffect(() => {
    const fetchData = async () => {
      let i = 0;
      try {
        const getAllHoaDonXuat = await exportInvoiceAPI.findDataChart(date(-6), date(0));
        setDataHDX(getAllHoaDonXuat);
        const getSumGiaSPN = await importIncoiceAPI.sumGiaSPN();
        setSumGiaSPN(getSumGiaSPN[0]);
        const getSumGiaSPX = await exportInvoiceAPI.sumGiaSPX();
        setSumGiaSPX(getSumGiaSPX[0]);
        const getMaSP = await chitiethoadonxuatAPI.groupByMaSP();
        console.log(getMaSP);
        setTopProduct(getMaSP);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const setdata = (day) => {
    let i = 0;
    let number = 0;
    for (i; i < dataHDX.length; i++) {
      if (moment.utc(dataHDX[i].NgayLapHDX).add(1, "days").format("YYYY-MM-DD") === date(day) && dataHDX[i].TinhTrangHD === 1) {
        number++;
      }
    }
    return number;
  };

  const data_chart_doughnut = {
    labels: ["Vốn", "Doanh Thu", "Lợi Nhuận"],
    datasets: [
      {
        label: "ShopShose",
        data: [sumGiaSPN.SUM_GiaSPN, sumGiaSPX.SUM_GiaSPX, sumGiaSPX.SUM_GiaSPX - sumGiaSPN.SUM_GiaSPN],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };

  const labels = [date_vn(-6), date_vn(-5), date_vn(-4), date_vn(-3), date_vn(-2), date_vn(-1), date_vn(0), date_vn(1)];
  const data_chart_line = [setdata(-6), setdata(-5), setdata(-4), setdata(-3), setdata(-2), setdata(-1), setdata(0), setdata(1)];

  const data_chart = {
    labels: labels,
    datasets: [
      {
        label: "SỐ LƯỢNG HÓA ĐƠN",
        data: data_chart_line,
        fill: false,
        borderColor: "#20b846",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container">
      <div className="container_chart">
        <div className="doughnut_chart">
          <Doughnut data={data_chart_doughnut} width={500} height={500} />
        </div>
        <div className="top_product">
          {topProduct?.map(({TenSP, TopProduct}, i) => (
            <div className="item_product" key={i}>
              <div>TOP {i + 1}</div>
              <div>{TenSP}</div>
              <div>{TopProduct}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="chart_line">
        <Line data={data_chart} width={1200} height={400} />
      </div>
    </div>
  );
};

export default MainPage;
