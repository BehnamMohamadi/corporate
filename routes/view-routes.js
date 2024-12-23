const router = require("express").Router();
const { join } = require("node:path");

router.get("/", (request, response) => {
  response.status(200).send("view");
});

router.get("/employees", async (request, response) => {
  const employees = await fetch("http://127.0.0.1:8000/api/employees/show-data-limit");
  const employeesAsJson = await employees.json();
  console.log(employeesAsJson);

  response.status(200).render(join(__dirname, "../views/landing-page.ejs"), {
    employees: employeesAsJson.data,
  });
});

router.get("/employee/:id", async (request, response) => {
  const { id } = request.params;
  const employee = await fetch(`http://127.0.0.1:8000/api/employees/show-employee/${id}`);
  const employeeAsJson = await employee.json();
  console.log(employeeAsJson.data);
  response.status(200).render(join(__dirname, "../views/employee-page.ejs"), {
    employee: employeeAsJson.data,
  });
});

router.get("/add-employee", async (request, response) => {
  response.status(200).render(join(__dirname, "../views/add-employee.ejs"));
});

router.get("/employee/new");
module.exports = router;
