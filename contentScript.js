// contentScript.js

// Add a check for 'extensionEnabled' before processing
chrome.storage.sync.get(['extensionEnabled'], (result) => {
    if (!result.extensionEnabled) {
        console.log("Extension is disabled. Skipping processing.");
        return;
    }

    // 1. 找到網頁中的所有 <p> 標籤
    const paragraphs = document.querySelectorAll("p");

    paragraphs.forEach((p) => {
        const originalText = p.innerText.trim();
        console.log('Found paragraph:', originalText);  // Debug log

        // 若段落沒有文字，則略過
        if (!originalText) return;

        // 2. 向 background.js 發送訊息，請求轉換文字
        chrome.runtime.sendMessage(
            { action: "transformText", textContent: originalText },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime error:", chrome.runtime.lastError);
                    return;
                }
                if (response && response.success) {
                    console.log('Received response:', response);  // Debug log
                    p.innerText = response.data;
                } else {
                    console.error("Error from background script:", response.error);
                }
            }
        );
    });

    // Function to handle processed text from background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'processedText') {
            const { originalText, processedText } = request.payload;

            console.log('Received processedText message:', { originalText, processedText }); // Debug log

            // Replace the original text with the processed text in the DOM
            replaceTextInDOM(originalText, processedText);

            // Log the processed text
            console.log('Processed Text:', processedText);
        }
        // ...
    });
});

// New function to replace text in the DOM
function replaceTextInDOM(original, processed) {
    console.log(`Starting replaceTextInDOM with original: "${original}" and processed: "${processed}"`); // Debug log
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes(original)) {
            console.log(`Replacing text in node: "${node.nodeValue}"`); // Debug log
            node.nodeValue = node.nodeValue.replace(original, processed);
            console.log(`Replaced with: "${node.nodeValue}"`); // Debug log
        }
    }
    console.log('Finished replaceTextInDOM'); // Debug log
}