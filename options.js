// options.js

document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveBtn = document.getElementById("save");
    const familiarTopicsInput = document.getElementById("familiarTopics");
    const toggleBtn = document.getElementById("toggleExtension");
    const statusMessage = document.getElementById("statusMessage");

    // Load saved settings
    chrome.storage.sync.get(["openaiApiKey", "familiarTopics", "extensionEnabled"], (result) => {
        if (result.openaiApiKey) {
            apiKeyInput.value = result.openaiApiKey;
        }
        if (result.familiarTopics) {
            familiarTopicsInput.value = result.familiarTopics;
        }
        if (result.extensionEnabled === undefined) {
            chrome.storage.sync.set({ extensionEnabled: true });
            toggleBtn.textContent = "Disable Extension";
        } else {
            toggleBtn.textContent = result.extensionEnabled ? "Disable Extension" : "Enable Extension";
        }
    });

    // Show status message
    const showStatus = (message, isError = false) => {
        const statusMessage = document.getElementById("statusMessage");
        if (!statusMessage) {
            console.error("Status message element not found");
            return;
        }

        statusMessage.textContent = message;
        statusMessage.style.display = "block";
        statusMessage.className = `status-message ${isError ? 'error' : 'success'}`;

        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 3000);
    };

    // Save settings
    saveBtn.addEventListener("click", () => {
        const apiKey = apiKeyInput.value.trim();
        const familiarTopics = familiarTopicsInput.value.trim();

        if (!apiKey) {
            showStatus("Please enter an API key", true);
            return;
        }

        chrome.storage.sync.set({
            openaiApiKey: apiKey,
            familiarTopics: familiarTopics
        }, () => {
            showStatus("Settings saved successfully!");
        });
    });

    // Toggle extension
    toggleBtn.addEventListener("click", () => {
        console.log("Toggle button clicked");
        chrome.storage.sync.get(["extensionEnabled"], (result) => {
            console.log("Current extensionEnabled state:", result.extensionEnabled);
            const newState = !result.extensionEnabled;
            chrome.storage.sync.set({ extensionEnabled: newState }, () => {
                console.log("New extensionEnabled state set to:", newState);
                toggleBtn.textContent = newState ? "Disable Extension" : "Enable Extension";
                showStatus(`Extension ${newState ? 'enabled' : 'disabled'}`);
            });
        });
    });
});