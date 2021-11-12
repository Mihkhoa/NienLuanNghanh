import "../../manage.css";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Line} from "@ant-design/charts";
import {Doughnut} from "react-chartjs-2";
import {Row, Col} from "antd";

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

  let chart;

  const data = [
    {date: date(-6), slsp: setdata(-6)},
    {date: date(-5), slsp: setdata(-5)},
    {date: date(-4), slsp: setdata(-4)},
    {date: date(-3), slsp: setdata(-3)},
    {date: date(-2), slsp: setdata(-2)},
    {date: date(-1), slsp: setdata(-1)},
    {date: date(0), slsp: setdata(0)},
    {date: date(1), slsp: setdata(1)},
  ];

  const config = {
    data,
    width: 1200,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "slsp",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const datas = {
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

  return (
    <div className="container">
      <div className="chart_line">
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      </div>
      <div className="container_chart">
        <div className="doughnut_chart">
          <Doughnut data={datas} width={500} height={500} />
        </div>
        <div className="top_product">
          {topProduct?.map(({TenSP, TopProduct}, i) => (
            <div className="item_product" key={i}>
              <div>TOP {i+1}</div>
              <div>{TenSP}</div>
              <div>{TopProduct}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
