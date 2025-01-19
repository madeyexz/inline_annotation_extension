import { getUserId } from './utils.js';

// Initialize function
async function initialize() {
  const userId = await getUserId();

  // Set up message listener
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "transformText") {
      const originalText = request.textContent;

      // Call the serverless function
      processTextWithOpenAI(originalText, userId).then(processedText => {
        sendResponse({ success: true, data: processedText });
      }).catch(error => {
        console.error("Error processing text:", error);
        sendResponse({ success: false, error: error.message });
      });

      // Return true to indicate you wish to send a response asynchronously
      return true;
    }
  });
}

// Call initialize without using top-level await
initialize().catch(error => {
  console.error("Failed to initialize background script:", error);
});

async function processTextWithOpenAI(text, userId, maxRetries = 2, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await chrome.storage.sync.get(["familiarTopics"]);
      const apiUrl = "https://inline-annotation-server.vercel.app/api/process-text";

      const requestBody = {
        userId,
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
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        console.error("All retry attempts failed");
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}