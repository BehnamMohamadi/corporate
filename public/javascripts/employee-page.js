async function renderUpdateEmployee(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/employees/show-employee/${id}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const employee = await response.json();

    document.getElementById("modalHeader").textContent = "ویرایش اطلاعات کارمند";
    document.getElementById("modalBody").innerHTML = generateModalBodyForUpdate(
      employee.data
    );
    document.getElementById("modalFooter").innerHTML = generateModalFooterForUpdate(id);

    openModal();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function updateEmployee(id) {
  const updatedData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.getElementById("gender").value,
    phoneNumber: document
      .getElementById("phoneNumber")
      .value.split(",")
      .map((num) => num.trim()),
    nationalId: document.getElementById("nationalId").value,
    city: document.getElementById("city").value,
    companyName: document.getElementById("companyName").value,
    role: document.getElementById("role").value,
  };

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/employees/update-data/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const responseErrorAsJson = await errorResponse.message.errors.map(
        (err) => err.msg
      );
      displayErrorMessage(responseErrorAsJson);
    } else {
      closeModal();
      location.reload();
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function generateModalBodyForUpdate(data) {
  return `
  <div id="error-message" style="color: red; display: none;"></div>
    <input type="text" id="firstName" value="${data.firstName}" placeholder="نام"/>  
   <br>
    <input type="text" id="lastName" value="${
      data.lastName
    }" placeholder="نام خانوادگی"/>  
  <br>
    <input type="text" id="gender" value="${data.gender}" placeholder="جنسیت"/>  
  <br>
    <input type="text" id="phoneNumber" value="${data.phoneNumber.join(
      ", "
    )}" placeholder="شماره تلفن"/>  
  <br>
    <input type="text" id="nationalId" value="${data.nationalId}" placeholder="کد ملی"/>  
  <br>
    <input type="text" id="city" value="${data.city}" placeholder="شهر" />  
  <br>
    <input type="text" id="companyName" value="${
      data.companyName
    }" placeholder="نام شرکت"/>  
  <br>
    <input type="text" id="role" value="${data.role}" placeholder="نقش"/>  
  <br>
  `;
}

function generateModalFooterForUpdate(id) {
  return `
    <button class="button" onclick="updateEmployee('${id}')">ذخیره</button>
    <button class="button" onclick="closeModal()">انصراف</button>
  `;
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "block";
  errorMessageElement.textContent = message;
}

async function removeEmployee(id) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/employees/delete-data/${id}`,
      {
        method: "delete",
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const responseErrorAsJson = await errorResponse.message;
    }
    window.location.href = `http://127.0.0.1:8000/view/employees`;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
