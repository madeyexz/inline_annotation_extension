// options.js

document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveBtn = document.getElementById("saveBtn");
    const familiarTermsInput = document.getElementById("familiarTerms");
    const toggleBtn = document.getElementById("toggleExtension");

    // 從 storage 讀取
    chrome.storage.sync.get(["openaiApiKey", "familiarTopics", "extensionEnabled"], (result) => {
        if (result.openaiApiKey) {
            apiKeyInput.value = result.openaiApiKey;
        }
        if (result.familiarTopics) {
            familiarTermsInput.value = result.familiarTopics;
        }
        if (result.extensionEnabled === undefined) {
            chrome.storage.sync.set({ extensionEnabled: true });
            toggleBtn.textContent = "Disable Extension";
        } else {
            toggleBtn.textContent = result.extensionEnabled ? "Disable Extension" : "Enable Extension";
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

    // Toggle extension state
    toggleBtn.addEventListener("click", () => {
        chrome.storage.sync.get("extensionEnabled", (result) => {
            const newState = !result.extensionEnabled;
            chrome.storage.sync.set({ extensionEnabled: newState }, () => {
                toggleBtn.textContent = newState ? "Disable Extension" : "Enable Extension";
            });
        });
    });
});