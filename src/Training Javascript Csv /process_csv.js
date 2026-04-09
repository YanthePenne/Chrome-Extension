//Data Import: Import CSV data into web applications for further processing or storage.
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const content = e.target.result;

        // Send data to background script for processing
        chrome.runtime.sendMessage(
          {
            type: "PROCESS_FILE",
            data: content,
          },
          (response) => {
            if (response && response.success) {
              document.getElementById("output").innerText =
                `Processed ${response.calculation} items.`;
            } else {
              document.getElementById("output").innerText =
                "Error processing file: " +
                (response?.error || "Unknown error");
            }
          },
        );
      };
      reader.readAsText(file);
    }
  });
