  function showMessage() {
      document.getElementById("message").textContent =
        "Button clicked successfully! Thank you for visiting.";
    }
    function changeBackgroundColor() {
      document.body.style.backgroundColor = "lightblue";
    }
    function resetBackgroundColor() {
      document.body.style.backgroundColor = "";
    }
    function toggleVisibility() {
      const messageElement = document.getElementById("message");
      if (messageElement.style.display === "none") {
        messageElement.style.display = "block";
      } else {
        messageElement.style.display = "none";
      }
    }
    function changeText() {
      const messageElement = document.getElementById("message");
      messageElement.textContent = "The text has been changed!";
    }
    function resetText() {
      const messageElement = document.getElementById("message");
      messageElement.textContent = "Button clicked successfully! Thank you for visiting.";
    }
    

