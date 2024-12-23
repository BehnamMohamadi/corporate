const validateInputs = (inputs) => {
  let isValid = true;
  for (const key in inputs) {
    if (inputs[key] === "" || inputs[key] == null) {
      isValid = false;
      displayErrorMessage(` ${key}needed`);
      break;
    }
  }
  return isValid;
};

const addEmployee = async () => {
  const newEmployee = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.getElementById("gender").value,
    phoneNumber: document.getElementById("phoneNumber").value.split(","),
    birthDate: document.getElementById("birthDate").value,
    nationalId: document.getElementById("nationalId").value,
    city: document.getElementById("city").value,
    companyName: document.getElementById("companyName").value,
    role: document.getElementById("role").value,
  };

  if (!validateInputs(newEmployee)) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/employees/add-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const responseErrorAsJson = await errorResponse.message.errors.map(
        (err) => err.msg
      );
      displayErrorMessage(responseErrorAsJson);
      console.log(responseErrorAsJson);
      return;
    }
  } catch (error) {
    displayErrorMessage("internal server error");
  }
};

const displayErrorMessage = (message) => {
  const errorMessageElement = document.querySelector(".error-message");
  errorMessageElement.style.display = "block";
  errorMessageElement.textContent = message;

  setTimeout(() => {
    errorMessageElement.style.display = "none";
  }, 5000);
};
