require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5173;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(require("./api/auth").router);
app.use("/departments", require("./api/departments"));
app.use("/professors", require("./api/professors"));

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
