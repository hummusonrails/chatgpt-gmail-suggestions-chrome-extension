function getEmailBody(signatureDelimiter) {
  const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
  const element = document.querySelector(selector);
  if (element) {
    let emailText = element.innerHTML;
    if (signatureDelimiter && emailText.includes(signatureDelimiter)) {
      emailText = emailText.substring(0, emailText.indexOf(signatureDelimiter)).trim();
    }
    return emailText;
  }

  return null;
}


async function sendToChatGPT(text, styles, apiKey, signatureDelimiter) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [{"role": "user", "content": `Review and provide suggestions for the following email draft combining the following styles or only a single style if only one is provided: ${styles.join(', ')}. Please return only the revised email text without suggesting a subject. Email draft: ${text}`}],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8
    })
  });

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    displaySuggestions(data.choices[0].message.content, signatureDelimiter);
  } else {
    console.log("No suggestions received");
  }
}

function displaySuggestions(suggestions, signatureDelimiter) {
  const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
  const element = document.querySelector(selector);
  if (element) {
    let newText = suggestions.trim();
    newText = newText.replace(/\n/g, '<br>');
    if (signatureDelimiter) {
      const signatureIndex = element.innerHTML.indexOf(signatureDelimiter);
      if (signatureIndex !== -1) {
        const signature = element.innerHTML.substring(signatureIndex);
        newText = newText + '<br><br>' + signature;
      }
    }
    
    if (element.getAttribute('contenteditable') === 'true') {
      element.focus();
      document.execCommand('selectAll', false, null);
      document.execCommand('insertHTML', false, newText);
    } else {
      element.innerHTML = newText;
    }
  }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reviewEmail") {
    const selectedStyles = request.styles;

    if (request) {
      chrome.storage.sync.get(["apiKey", "signatureDelimiter"], result => {
        if (result.apiKey) {
          const emailBody = getEmailBody(result.signatureDelimiter);
          sendToChatGPT(emailBody, selectedStyles, result.apiKey, result.signatureDelimiter).then(() => {
            sendResponse({ success: true });
          }).catch(() => {
            sendResponse({ success: false });
          });
        } else {
          alert("Please enter and save your OpenAI API key in the extension settings.");
          sendResponse({ success: false });
        }
      });
    } else {
      sendResponse({ success: false });
    }

    return true;
  }
});
