function generateText(prompt) {
  fetch('https://api.openai.com/v1/text-davinci/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      "prompt": prompt,
        // Maybe new model? Could be a cost saving thing here
      "model": "text-davinci-002",
      "max_tokens": 100
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.choices[0].text);
  });
}

// Get the user's Google Account ID. 

//Need to update and add in google stuff. how do I manage accounts here?

chrome.identity.getProfileUserInfo(userInfo => {
  const userId = userInfo.id;

// Send the user's Google Account ID to Google Analytics
  ga('set', 'userId', userId);
});

// Initialize the Google Analytics tracker
ga('create', 'UA-YOUR_TRACKING_ID', 'auto');

// Track the extension usage event
ga('send', 'event', 'Extension', 'Usage');


// Get prompt from email
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const tab = tabs[0];
  chrome.tabs.sendMessage(tab.id, { action: 'getText' }, response => {
    const prompt = response.text;
    generateText(prompt);
  });
});

// Get prompt from manual input
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  const prompt = document.querySelector('#manual-prompt').value;
  generateText(prompt);
});
