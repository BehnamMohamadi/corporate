const router = require("express").Router();
const {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  showEmployeesLimitedData,
  showEmployeesData,
  updateEmployeeData,
  removeEmplpyeeData,
 
} = require("../controllers/employee-controller");
const validateEmployee = require("../controllers/employee-validation");

router.get("/show-employees", getAllEmployees);
router.get("/show-employee/:id", getOneEmployee);
router.post("/add-employee", validateEmployee, addEmployee);
router.get("/show-data-limit", showEmployeesLimitedData);
router.get("/show-data", showEmployeesData);
router.patch("/update-data/:id", validateEmployee, updateEmployeeData);
router.delete("/delete-data/:id", removeEmplpyeeData);

module.exports = router;
