import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';
import fse from 'fs-extra'; // <-- Importa o fs-extra

const dist = 'dist';
console.log('Iniciando build com fs-extra...');

// Limpa a pasta dist
fse.emptyDirSync(dist);
console.log('Pasta dist/ limpa.');

// Copia arquivos essenciais
try {
  // Usando fse.copySync que é mais robusto
  if (fse.existsSync('manifest.json')) {
    fse.copySync('manifest.json', path.join(dist, 'manifest.json'));
    console.log('manifest.json copiado.');
  } else {
    console.warn('AVISO: manifest.json não encontrado na raiz.');
  }

  if (fse.existsSync('src')) {
    fse.copySync('src', path.join(dist, 'src'));
    console.log('Pasta src/ copiada.');
  } else {
    console.warn('AVISO: Pasta src/ não encontrada na raiz.');
  }

  if (fse.existsSync('icons')) {
    fse.copySync('icons', path.join(dist, 'icons'));
    console.log('Pasta icons/ copiada.');
  } else {
    console.warn('AVISO: Pasta icons/ não encontrada na raiz.');
  }

} catch (err) {
  console.error('--- ERRO AO COPIAR ARQUIVOS ---', err);
  process.exit(1);
}

console.log('Arquivos copiados. Gerando ZIP...');

// Gera ZIP
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

// Adiciona todo o conteúdo da pasta dist/ ao zip
// O 'false' no segundo argumento evita criar uma pasta 'dist' dentro do zip
archive.directory(dist, false);
archive.pipe(output);

output.on('close', () => {
  console.log(`ZIP gerado: ${archive.pointer()} bytes`);
  console.log('Build gerado em dist/ e dist/extension.zip');
});

output.on('error', (err) => {
  console.error('Erro ao gerar ZIP:', err);
  throw err;
});

// Finaliza o arquivamento
await archive.finalize();