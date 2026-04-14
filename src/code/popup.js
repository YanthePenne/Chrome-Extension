const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const fileInfo = document.getElementById("fileInfo");
const resultCard = document.getElementById("resultCard");
const resultValue = document.getElementById("resultValue");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show file name
  fileName.textContent = `Selected: ${file.name}`;
  fileInfo.classList.remove("hidden");

  const reader = new FileReader();
  reader.onload = (event) => {
    chrome.runtime.sendMessage(
      { type: "PROCESS_FILE", data: event.target.result },
      (response) => {
        // Show result card and update value
        resultValue.textContent = response.calculation;
        resultCard.classList.remove("hidden");
      },
    );
  };
  reader.readAsText(file);
});
