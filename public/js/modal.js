const contactModal = document.getElementById("user-modal");
function toggleModal() {
  if (contactModal.className.includes("show")) {
    contactModal.classList.remove("show");
  } else {
    contactModal.classList.add("show");
  }
}

function submitUserDetails() {
  const inputName = document.getElementById("login-username-input").value;
  const inputPassword = document.getElementById("login-password-input").value;
 
  toggleModal();
}
