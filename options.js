// options.js

document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveBtn = document.getElementById("saveBtn");

    // 從 storage 讀取
    chrome.storage.sync.get(["openaiApiKey"], (result) => {
        if (result.openaiApiKey) {
            apiKeyInput.value = result.openaiApiKey;
        }
    });

    // 存到 storage
    saveBtn.addEventListener("click", () => {
        const key = apiKeyInput.value.trim();
        chrome.storage.sync.set({ openaiApiKey: key }, () => {
            alert("API Key Saved");
        });
    });
});