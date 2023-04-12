const apiKeyInput = document.getElementById('apiKeyInput');
const signatureDelimiterInput = document.getElementById('signatureDelimiter');
const editApiKeyButton = document.getElementById('editApiKeyButton');
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener("click", () => {
  const apiKey = apiKeyInput.value;
  const signatureDelimiter = signatureDelimiterInput.value;
  chrome.storage.sync.set({ apiKey, signatureDelimiter }, () => {
    alert("API key and signature delimiter saved.");
    apiKeyInput.readOnly = true;
    apiKeyInput.type = 'password';
  });
});

document.getElementById("reviewButton").addEventListener("click", () => {
  const selectedStyles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map(input => input.value);

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "reviewEmail", styles: selectedStyles });
  });
});

chrome.storage.sync.get(["apiKey", "signatureDelimiter"], result => {
  apiKeyInput.value = result.apiKey || '';

  if (result.signatureDelimiter) {
    signatureDelimiterInput.value = result.signatureDelimiter;
  }
});

editApiKeyButton.addEventListener('click', () => {
  apiKeyInput.readOnly = false;
  apiKeyInput.type = 'text';
  apiKeyInput.focus();
});
