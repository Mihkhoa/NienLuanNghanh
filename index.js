const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 3002;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router init
require("./routes/taikhoan.routes")(app);
require("./routes/sanpham.routes")(app);
require("./routes/loaisanpham.routes")(app);
require("./routes/hinhanhsanpham.routes")(app);
require("./routes/kichthuocsanpham.routes")(app);
require("./routes/thuonghieu.routes")(app);
require("./routes/hoadonnhap.routes")(app);
require("./routes/hoadonxuat.routes")(app);
require("./routes/chitiethoadonxuat.routes")(app);
require("./routes/giohang.routes")(app);
require("./routes/khachhang.routes")(app);
require("./routes/payment.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
