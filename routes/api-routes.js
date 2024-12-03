const router = require("express").Router();
const employeeRouter = require("./employee-routes");

router.use("/employees", employeeRouter);

module.exports = router;
