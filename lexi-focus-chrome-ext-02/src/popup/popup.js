const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle img');
const lexendBtn = document.getElementById('lexend-btn');
const atkinsonBtn = document.getElementById('atkinson-btn');

const SUN_ICON = '../src/images/sun-icon.png';
const MOON_ICON = '../src/images/moon-icon.png';

// Função para atualizar o ícone do tema baseado no estado salvo
function updateThemeIcon(isDark) {
    if (isDark) {
        themeIcon.src = MOON_ICON;
        themeIcon.alt = 'Ícone de Lua';
    } else {
        themeIcon.src = SUN_ICON;
        themeIcon.alt = 'Ícone de Sol';
    }
}

// Carrega o estado salvo quando o pop-up é aberto
chrome.storage.local.get(['isDark'], (result) => {
    updateThemeIcon(result.isDark);
});

// Event listener para o botão de tema
themeButton.addEventListener('click', () => {
    chrome.storage.local.get(['isDark'], (result) => {
        const newIsDark = !result.isDark;
        // Atualiza o ícone imediatamente
        updateThemeIcon(newIsDark);
        // Salva o novo estado
        chrome.storage.local.set({ isDark: newIsDark });
    });
});

// Event listeners para os botões de fonte
lexendBtn.addEventListener('click', () => {
    chrome.storage.local.set({ currentFont: 'Lexend' });
});

atkinsonBtn.addEventListener('click', () => {
    chrome.storage.local.set({ currentFont: 'Atkinson Hyperlegible' });
});
