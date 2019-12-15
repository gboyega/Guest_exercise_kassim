const express = require("express");


const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 4004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes/uploadRoute");
routes(app);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
