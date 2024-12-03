const router = require("express").Router();
const {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  showEmployeesLimitedData,
  showEmployeesData,
  updateEmployeeData,
  removeEmplpyeeData,
  findEmployeesByCity,
  findEmployeesByage,
  findEmployeesByPhoneCount,
  findWomenManager,
  sortEmployeeMenByAge,
} = require("../controllers/employee-controller");
const validateEmployee = require("../controllers/employee-validation");

router.get("/show-employees", getAllEmployees);
router.get("/show-employee/:id", getOneEmployee);
router.post("/", validateEmployee, addEmployee);
router.get("/show-data-limit", showEmployeesLimitedData);
router.get("/show-data", showEmployeesData);
router.patch("/update-data/:id", updateEmployeeData);
router.delete("/delete-data/:id", removeEmplpyeeData);
router.get("/find-city/:city", findEmployeesByCity);
router.get("/find-older-than/:age", findEmployeesByage);
router.get("/find-phoneNumber-count/:count", findEmployeesByPhoneCount);
router.get("/find-women-manager", findWomenManager);
router.get("/sort-man-byage", sortEmployeeMenByAge);

module.exports = router;
