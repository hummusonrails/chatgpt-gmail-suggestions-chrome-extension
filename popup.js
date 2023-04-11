document.getElementById("saveButton").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value;
  const signatureDelimiter = document.getElementById("signatureDelimiter").value;
  chrome.storage.sync.set({ apiKey, signatureDelimiter }, () => {
    alert("API key and signature delimiter saved.");
  });
});

document.getElementById("reviewButton").addEventListener("click", () => {
  const selectedStyles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map(input => input.value);

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "reviewEmail", styles: selectedStyles });
  });
});

chrome.storage.sync.get(["apiKey", "signatureDelimiter"], result => {
  if (result.apiKey) {
    document.getElementById("apiKeyInput").value = result.apiKey;
  }
  if (result.signatureDelimiter) {
    document.getElementById("signatureDelimiter").value = result.signatureDelimiter;
  }
});