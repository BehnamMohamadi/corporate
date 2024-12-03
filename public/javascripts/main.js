async function renderUpdateEmployee(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/employees/show-employee/${id}`);
  const employee = await response.json();

  document.getElementById("modalHeader").textContent = "ویرایش اطلاعات کارمند";

  document.getElementById("modalBody").innerHTML = `
    <input type="text" id="firstName" value="${
      employee.data.firstName
    }" placeholder="نام" /> </br>

    <input type="text" id="lastName" value="${
      employee.data.lastName
    }" placeholder="نام خانوادگی" /> </br>

    <input type="text" id="gender" value="${
      employee.data.gender
    }" placeholder="جنسیت" /> </br>

    <input type="text" id="phoneNumber" value="${employee.data.phoneNumber.join(
      ", "
    )}" placeholder="شماره تلفن" /> </br>

    <input type="text" id="nationalId" value="${
      employee.data.nationalId
    }" placeholder="کد ملی" /> </br>

    <input type="text" id="city" value="${employee.data.city}" placeholder="شهر" /> </br>

    <input type="text" id="companyName" value="${
      employee.data.companyName
    }" placeholder="نام شرکت" /> </br>

    <input type="text" id="role" value="${employee.data.role}" placeholder="نقش" /> </br>
    
  `;

  document.getElementById(
    "modalFooter"
  ).innerHTML = `<button class="button" onclick="updateEmployee('${id}')">ذخیره</button>
    <button class="button" onclick="closeModal()">انصراف</button>`;

  openModal();
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

    if (!response.ok) throw new Error("Network response was not ok");

    closeModal();
    location.reload();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
