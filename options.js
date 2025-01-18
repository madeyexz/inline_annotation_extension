// options.js

document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveBtn = document.getElementById("saveBtn");
    const familiarTermsInput = document.getElementById("familiarTerms");

    // 從 storage 讀取
    chrome.storage.sync.get(["openaiApiKey", "familiarTopics"], (result) => {
        if (result.openaiApiKey) {
            apiKeyInput.value = result.openaiApiKey;
        }
        if (result.familiarTopics) {
            familiarTermsInput.value = result.familiarTopics;
        }
    });

    // 存到 storage
    saveBtn.addEventListener("click", () => {
        const apiKey = apiKeyInput.value.trim();
        const familiarTopics = familiarTermsInput.value.trim();

        chrome.storage.sync.set({ openaiApiKey: apiKey, familiarTopics: familiarTopics }, () => {
            console.log('Settings saved');
            alert('Settings saved');
        });
    });
});