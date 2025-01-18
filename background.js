// background.js

// 請換成你實際的 OpenAI Key（建議改為在 options.html 中輸入後儲存於 chrome.storage）
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

// 監聽來自 contentScript 的訊息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "transformText") {
    const originalText = request.textContent;

    // Call OpenAI API or any other processing
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
    const result = await chrome.storage.sync.get(["openaiApiKey", "familiarTopics"]);
    if (!result.openaiApiKey) {
      throw new Error("OpenAI API key not found. Please set it in the extension options.");
    }

    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const model = "gpt-4o-mini";

    // Include familiar topics in the system instruction
    const familiarTopics = result.familiarTopics ? result.familiarTopics.split(',').map(topic => topic.trim()).join(', ') : '';
    const systemInstruction = `
      你的任務是將文字中對於用戶而言冷門的「專有名詞」替換成 「專有名詞（一句話簡單解釋）」的形式。不要解釋任何顯而易見的專有名詞。你可以假設用戶的認知起點是大學畢業生的認知起點。請保持其他文字內容不變。

      此外，不要對以下領域的詞添加註釋，除非這是該領域的冷門詞彙：${familiarTopics}.
    `;

    const requestBody = {
      model,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: text }
      ],
      temperature: 0.7
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.openaiApiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const processedText = text.toUpperCase(); // Example transformation
        resolve(processedText);
      }, 1000);
    });
  }
}