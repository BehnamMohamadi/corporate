const mongoose = require("mongoose");
const Corporate = require("../models/corporate-model");
const Employee = require("../models/employee-model");
const { AppError } = require("../utils/app-error");

// const eachCompaniesManager = async (request, response, next) => {
//   try {
//     const employees = await Employee.find({ role: "manager" })
//       .select("firstName lastName role corporate")
//       .populate("corporate");

//     const managers = employees.map((employee) => {
//       return {
//         ...employee.toObject(),
//         corporate: employee.corporate.name,
//       };
//     });

//     response.status(200).json({
//       status: "success",
//       data: { managers },
//     });
//   } catch (err) {
//     next(new AppError(500, err.message));
//   }
// };

const showEmployeesOfCprporate = async (request, response, next) => {
  try {
    const corporateId = request.params.id;

    const employees = await Employee.find({ corporate: corporateId })
      .select("firstName lastName  corporate")
      .populate("corporate");

    const emp = employees.map((employee) => {
      return {
        ...employee.toObject(),
        corporate: employee.corporate.name,
      };
    });
    
    response.status(200).json({
      status: "success",
      data: { emp },
    });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};
const getAllCorporate = async (request, response, next) => {
  try {
    const corporates = await Corporate.find({});

    response.status(200).json({
      status: "success",
      data: { corporates },
    });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const getOneCorporate = async (request, response, next) => {
  try {
    const { id } = request.params;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return next(new AppError(400, " id has not found"));
    }

    const corporate = await Corporate.findById(id);
    if (!corporate) {
      return next(new AppError(400, "the corporate has not found"));
    }

    response.status(200).json({ status: "success", data: corporate });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

const addCorporate = async (request, response, next) => {
  try {
    const newCorporate = request.body;
    const addNewCorporate = new Corporate(newCorporate);

    const registrationNumberIsExist = await Corporate.exists({
      registrationNumber: newCorporate.registrationNumber,
    });
    if (registrationNumberIsExist) {
      return next(new AppError(400, "registrationNumber IsExist is already exist"));
    }

    const phoneIsExist = await Corporate.exists({ telphone: newCorporate.telphone });
    if (phoneIsExist) {
      return next(new AppError(400, "phone is already exist in dbs"));
    }

    await addNewCorporate.save();

    response.status(200).json({ message: "sucess", data: newCorporate });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

const updateCorporate = async (request, response, next) => {
  try {
    const { id } = request.params;
    const newInfo = await Corporate.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (!newInfo) {
      next(new AppError(404, "Corporate not found"));
    }
    response.status(200).json({ status: "success", data: newInfo });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

const removeCorporate = async (request, response, next) => {
  try {
    const { id } = request.params;
    console.log(id);
    const removeOneCorporate = await Corporate.findByIdAndDelete(id);
    console.log(removeOneCorporate);
    if (!removeOneCorporate) {
      return next(new AppError(404, "Corporate not fund"));
    }
    response
      .status(204)
      .json({ status: "success", data: { message: "Corporate removed" } });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

module.exports = {
  getAllCorporate,
  addCorporate,
  removeCorporate,
  getOneCorporate,
  updateCorporate,
  showEmployeesOfCprporate,
};
