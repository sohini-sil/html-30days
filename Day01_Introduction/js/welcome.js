const startButton = document.getElementById("startButton");
const welcomeText = document.getElementById("welcomeText");

startButton.addEventListener("click", function () {
    welcomeText.textContent = "Let's Get Started! ";

    alert("Welcome! You are ready to go.");
});