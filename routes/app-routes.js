const router = require("express").Router();
const apiRouter = require("./api-routes");
const viewRouter = require("./view-routes");

router.use("/api", apiRouter);
router.use("/view", viewRouter);

module.exports = router;
