
const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const togglePassword =
  document.getElementById("togglePassword");

const strength =
  document.getElementById("strength");

const strengthProgress =
  document.getElementById("strengthProgress");

const strengthText =
  document.getElementById("strengthText");

const loginBtn =
  document.getElementById("loginBtn");

const btnText =
  document.getElementById("btnText");

const spinner =
  document.getElementById("spinner");

const successMessage =
  document.getElementById("successMessage");

togglePassword.addEventListener("click", () => {

  if (password.type === "password") {

    password.type = "text";

    togglePassword.textContent = "🙈";

  } else {

    password.type = "password";

    togglePassword.textContent = "👁";

  }

});

password.addEventListener("input", () => {

  const value = password.value;

  if (value.length === 0) {

    strength.style.display = "none";

    return;
  }

  strength.style.display = "block";

  let score = 0;


  // Minimum length
  if (value.length >= 8) {
    score++;
  }

  // Long password
  if (value.length >= 12) {
    score++;
  }
  if (/[A-Z]/.test(value)) {
    score++;
  }
  if (/[0-9]/.test(value)) {
    score++;
  }

  // Special character
  if (/[^A-Za-z0-9]/.test(value)) {
    score++;
  }


  let width = 0;
  let color = "#ff7675";
  let text = "Very weak";


  switch (score) {

    case 1:
      width = 20;
      color = "#ff7675";
      text = "Very weak";
      break;

    case 2:
      width = 40;
      color = "#fdcb6e";
      text = "Weak";
      break;

    case 3:
      width = 60;
      color = "#ffeaa7";
      text = "Medium";
      break;

    case 4:
      width = 80;
      color = "#00cec9";
      text = "Strong";
      break;

    case 5:
      width = 100;
      color = "#55efc4";
      text = "Very strong";
      break;

  }


  strengthProgress.style.width = `${width}%`;

  strengthProgress.style.background = color;

  strengthText.textContent = text;

  strengthText.style.color = color;

});

function validateEmail(value) {

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(value);

}

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();

  let isValid = true;

  const emailValue = email.value.trim();

  if (!validateEmail(emailValue)) {

    emailError.style.display = "block";

    email.style.borderColor = "#ff7675";

    isValid = false;

  } else {

    emailError.style.display = "none";

    email.style.borderColor = "#55efc4";

  }

  if (password.value.length < 8) {

    passwordError.style.display = "block";

    password.style.borderColor = "#ff7675";

    isValid = false;

  } else {

    passwordError.style.display = "none";

    password.style.borderColor = "#55efc4";

  }


  // Stop if validation failed

  if (!isValid) {
    return;
  }


  loginBtn.disabled = true;

  btnText.style.display = "none";

  spinner.style.display = "block";


  /*
    DEMO LOGIN

    In a real application, replace this
    setTimeout() with a fetch() request
    to your backend API.
  */

  setTimeout(() => {

    spinner.style.display = "none";

    btnText.style.display = "block";

    btnText.textContent = "Signed In ✓";

    successMessage.style.display = "block";

    loginBtn.style.background =
      "linear-gradient(135deg, #00b894, #55efc4)";

  }, 1800);

});


email.addEventListener("input", () => {

  emailError.style.display = "none";

  email.style.borderColor =
    "rgba(255,255,255,0.15)";

});
password.addEventListener("input", () => {

  passwordError.style.display = "none";

  password.style.borderColor =
    "rgba(255,255,255,0.15)";

});