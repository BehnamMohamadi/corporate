function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  resetModal();
  modal.style.display = "none";
}

function resetModal() {
  modalHeader.textContent = "DEFAULT";
  modalBody.innerHTML = "";
  modalBodyError.innerHTML = "";
  modalFooter.innerHTML = "";
}

window.onclick = function (event) {
  if (event.target == modal) closeModal();
};
function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
