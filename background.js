// background.js

// 監聽來自 contentScript 的訊息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "transformText") {
    const originalText = request.textContent;

    // Call the serverless function
    processTextWithOpenAI(originalText).then(processedText => {
      sendResponse({ success: true, data: processedText });
    }).catch(error => {
      console.error("Error processing text:", error);
      sendResponse({ success: false, error: error.message });
    });

    // Return true to indicate you wish to send a response asynchronously
    return true;
  }
});

async function processTextWithOpenAI(text) {
  try {
    const result = await chrome.storage.sync.get(["familiarTopics"]);
    const apiUrl = "https://inline-annotation-server-5bakligat-madeyexzs-projects.vercel.app/api/process-text";

    const requestBody = {
      text,
      familiarTopics: result.familiarTopics || ''
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error("Error processing text:", error);
    throw error;
  }
}