// O service worker escuta por mensagens do popup.js
chrome.runtime.onMessage.addListener((message) => {
    // Busca a aba ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;
            
            // Injeta o content.js na aba ativa
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['src/content/content.js']
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erro ao injetar script: " + chrome.runtime.lastError.message);
                } else {
                    // Envia a mensagem para o content.js APÓS a injeção
                    chrome.tabs.sendMessage(tabId, message, (response) => {
                        if (chrome.runtime.lastError) {
                            console.error("Erro ao enviar mensagem para o content.js: " + chrome.runtime.lastError.message);
                        }
                    });
                }
            });
        }
    });
});
