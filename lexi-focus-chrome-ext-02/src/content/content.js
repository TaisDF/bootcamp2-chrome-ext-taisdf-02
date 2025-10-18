// Funções para aplicar os estilos
function applyTheme(isDark) {
    const styleId = 'lexifocus-theme-style';
    let style = document.getElementById(styleId);

    if (isDark) {
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }
        style.textContent = `
            body, body *, p, h1, h2, h3, h4, h5, h6, a, span, div, li, td, th {
                background-color: #111 !important;
                color: #EEE !important;
            }
            a { color: #80CFFF !important; }
        `;
    } else {
        if (style) {
            style.remove();
        }
    }
}

function applyFont(font) {
    const styleId = 'lexifocus-font-style';
    let style = document.getElementById(styleId);

    if (font) {
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }
        style.textContent = `
            body, body *, p, h1, h2, h3, h4, h5, h6, a, span, div, li, td, th {
                font-family: "${font}", sans-serif !important;
            }
        `;
    } else {
        if (style) {
            style.remove();
        }
    }
}

// 1. Aplica o estado salvo ao carregar a página
chrome.storage.local.get(['isDark', 'currentFont'], (result) => {
    applyTheme(result.isDark);
    applyFont(result.currentFont);
});

// 2. Escuta mudanças no storage e aplica os estilos
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
        if (changes.isDark) {
            applyTheme(changes.isDark.newValue);
        }
        if (changes.currentFont) {
            applyFont(changes.currentFont.newValue);
        }
    }
});