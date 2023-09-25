const contactModal = document.getElementById("user-modal");
function toggleModal() {
  if (contactModal.className.includes("show")) {
    contactModal.classList.remove("show");
  } else {
    contactModal.classList.add("show");
  }
}

function submitUserDetails() {
    const inputName = document.getElementById("name-input").value 
    alert(`Thanks ${inputName} for reaching out!`);
    toggleModal();
}