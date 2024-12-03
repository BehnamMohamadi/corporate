const Employee = require("../models/employee-model");
const { AppError } = require("../utils/app-error");

const getAllEmployees = async (request, response, next) => {
  try {
    const employees = await Employee.find({});

    response.status(200).json({
      status: "success",
      data: { employees },
    });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const getOneEmployee = async (request, response, next) => {
  try {
    const { id } = request.params;
    const employee = await Employee.findById({ _id: id });

    response.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const addEmployee = async (request, response, next) => {
  try {
    // await Employee.exists({ phoneNumber: request.body.phoneNumber });

    const employee = new Employee(request.body);
    console.info(`employee (id:${employee._id}}) added successfully.`);

    response.status(200).json({
      status: "success",
      data: { employee },
    });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const showEmployeesLimitedData = async (request, response, next) => {
  const employees = await Employee.find({}).select(
    `_id firstName lastName gender birthDate companyName city `
  );

  const employeesLimitedDataWithAge = employees.map((employee) => {
    const age = new Date().getFullYear() - new Date(employee.birthDate).getFullYear();

    return {
      id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      birthDate: age,
      city: employee.city,
      companyName: employee.companyName,
    };
  });

  response.status(200).json({ status: "success", data: employeesLimitedDataWithAge });
};

const showEmployeesData = async (request, response, next) => {
  const employees = await Employee.find({}, { registrationDate: 0, __v: 0, _id: 0 });

  response.status(200).json({ status: "success", data: employees });
};

const updateEmployeeData = async (request, response, next) => {
  const { id } = request.params;
  const data = request.body;
  const employeeWithNewInfo = await Employee.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!employeeWithNewInfo) {
    next(new AppError(404, "Employee not found"));
  }

  response.status(200).json({ status: "success", data: employeeWithNewInfo });
};

const removeEmplpyeeData = async (request, response, next) => {
  const { id } = request.params;
  const employeeWithNewInfo = await Employee.findByIdAndDelete(id);
  if (!employeeWithNewInfo) {
    next(new AppError(404, "Employee not fund"));
  }

  response.status(204).json({ status: "success", data: { message: "employee removed" } });
};

const findEmployeesByCity = async (request, response, next) => {
  const { city } = request.params;
  const employeesInOneCity = await Employee.find({ city });

  response.status(200).json({ status: "success", data: employeesInOneCity });
};

const findEmployeesByage = async (request, response, next) => {
  const { age: targetAge } = request.params;
  const employees = await Employee.find({});

  const employeesOlderThanAge = employees.filter((employee) => {
    const age = new Date().getFullYear() - new Date(employee.birthDate).getFullYear();
    if (age < targetAge) {
      return false;
    }
    return true;
  });

  response.status(200).json({ status: "success", data: employeesOlderThanAge });
};

const findEmployeesByPhoneCount = async (request, response, next) => {
  const { count } = request.params;
  const employeesWithOnePhoneNumber = await Employee.find({
    phoneNumber: { $size: count },
  });

  response.status(200).json({ status: "success", data: employeesWithOnePhoneNumber });
};

const findWomenManager = async (request, response, next) => {
  const employeesWomenAndManager = await Employee.find({
    gender: "woman",
    role: "manager",
  });

  response.status(200).json({ status: "success", data: employeesWomenAndManager });
};

const sortEmployeeMenByAge = async (request, response, next) => {
  const employeesMen = await Employee.find({ gender: "man" });

  const employeesMenWithAge = employeesMen.map((employee) => {
    const age = new Date().getFullYear() - new Date(employee.birthDate).getFullYear();

    return { ...employee.toObject(), age };
  });

  const sortEmployeesWithAge = employeesMenWithAge.sort((a, b) => b.age - a.age);

  response.status(200).json({ status: "success", data: sortEmployeesWithAge });
};

module.exports = {
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
};
