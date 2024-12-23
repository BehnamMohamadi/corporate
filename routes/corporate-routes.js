const router = require("express").Router();
const validateCorporate = require("../controllers/corporate-validation");
const {
  getAllCorporate,
  addCorporate,
  removeCorporate,
  getOneCorporate,
  updateCorporate,
  showEmployeesOfCprporate,
} = require("../controllers/corporate-conroller");

router.get("/show-employees/:id", showEmployeesOfCprporate);

router.get("/show-corporates", getAllCorporate);
router.get("/show-corporate/:id", getOneCorporate);
router.patch("/update-corporate/:id", updateCorporate);
router.post("/add-corporate", validateCorporate, addCorporate);

router.delete("/remove-corporate/:id", removeCorporate);
module.exports = router;
