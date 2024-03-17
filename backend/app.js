const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(shopRouter);
app.use(adminRouter);

app.listen(5000);
