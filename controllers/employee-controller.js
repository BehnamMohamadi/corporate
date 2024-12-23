const Employee = require("../models/employee-model");
const Corporate = require("../models/corporate-model");
const { AppError } = require("../utils/app-error");
const { ObjectId } = require("mongoose").Types;

const getAllEmployees = async (request, response, next) => {
  try {
    const employees = await Employee.find({})
      .select("firstName lastName corporate")
      .populate("corporate");

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
    const employee = await Employee.findById({ _id: id }).populate("corporate");

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
    if (!isValidObjectId(request.body.corporate)) {
      return next(new AppError(400, "invalid corporate id"));
    }

    const corporate = await Corporate.findById(request.body.corporate);
    if (!corporate) {
      return next(new AppError(404, "corporate id not-found "));
    }

    const employee = new Employee(request.body);

    await employee.save();
    console.info(`employee (id:${employee._id}}) added successfully.`);

    response.status(200).json({
      status: "success",
      data: { employee },
    });
  } catch (err) {
    console.log(err);
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
  try {
    const employeeWithNewInfo = await Employee.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    if (!employeeWithNewInfo) {
      next(new AppError(404, "Employee not found"));
    }

    response.status(200).json({ status: "success", data: employeeWithNewInfo });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

const removeEmplpyeeData = async (request, response, next) => {
  const { id } = request.params;
  if (!isValidObjectId(id)) {
    return next(new AppError(400, "invalid employee id"));
  }

  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    next(new AppError(404, "Employee not fund"));
  }

  response.status(204).json({ status: "success", data: { message: "employee removed" } });
};

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (new ObjectId(id).toString() === id) {
      return true;
    }
    return false;
  }
  return false;
}

module.exports = {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  showEmployeesLimitedData,
  showEmployeesData,
  updateEmployeeData,
  removeEmplpyeeData,
};
