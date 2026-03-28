// 1. Cast elements to specific HTML types so TS knows their properties
const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const fileName = document.getElementById("fileName") as HTMLSpanElement;
const fileInfo = document.getElementById("fileInfo") as HTMLDivElement;
const resultCard = document.getElementById("resultCard") as HTMLDivElement;
const resultValue = document.getElementById("resultValue") as HTMLSpanElement;

// 2. Define an interface for your expected Chrome response
interface ProcessResponse {
  calculation: string;
}

fileInput.addEventListener("change", (e: Event) => {
  // Cast the target to HTMLInputElement to access .files
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Show file name
  fileName.textContent = `Selected: ${file.name}`;
  fileInfo.classList.remove("hidden");

  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const fileData = event.target?.result;

    if (fileData) {
      chrome.runtime.sendMessage(
        { type: "PROCESS_FILE", data: fileData },
        (response: ProcessResponse) => {
          // Show result card and update value
          resultValue.textContent = response.calculation;
          resultCard.classList.remove("hidden");
        },
      );
    }
  };

  reader.readAsText(file);
});
