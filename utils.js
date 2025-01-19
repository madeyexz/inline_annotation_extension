function generateUUID() {
    // Simple UUID generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function getUserId() {
    const storage = await chrome.storage.sync.get(['userId']);
    if (storage.userId) {
        return storage.userId;
    } else {
        const newUserId = generateUUID();
        await chrome.storage.sync.set({ userId: newUserId });
        return newUserId;
    }
}

export { getUserId }; 