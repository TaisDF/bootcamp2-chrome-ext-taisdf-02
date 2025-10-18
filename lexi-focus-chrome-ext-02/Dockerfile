# Base Playwright (Chromium já incluído)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências (npm ci é mais rápido para CI)
RUN npm ci --silent

# (Opcional, mas seguro) Instala as dependências de browser
RUN npx playwright install --with-deps chromium

# Copia TODO o resto do seu projeto para dentro do container
COPY . .

# Roda o build da extensão DENTRO do container
# Isso cria a pasta /app/dist
RUN npm run build

# Define o comando padrão (será substituído pelo docker-compose)
CMD ["npm","test"]