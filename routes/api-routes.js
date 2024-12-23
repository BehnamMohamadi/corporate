const router = require("express").Router();
const employeeRouter = require("./employee-routes");
const corporateRouter = require("./corporate-routes");

router.use("/employees", employeeRouter);
router.use("/corporate", corporateRouter);

module.exports = router;
