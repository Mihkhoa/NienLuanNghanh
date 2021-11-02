const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router init
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/typeProduct.routes")(app);
require("./routes/image.routes")(app);
require("./routes/size.routes")(app);
require("./routes/tradeMark.routes")(app);
require("./routes/importInvoice.routes")(app);
require("./routes/cart.routes")(app);
require("./routes/payment.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
