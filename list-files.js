const fs = require('fs');
const path = require('path');

// Diretórios que você quer ignorar
const ignoredDirs = ['node_modules', '.git', 'dist', 'build', 'cache'];

// Extensões de arquivos que você quer listar
const validExtensions = ['.js', '.ts', '.tsx', '.css', '.json', '.md'];

function listFiles(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        results = results.concat(listFiles(fullPath));
      }
    } else {
      if (validExtensions.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });

  return results;
}

const rootDir = path.resolve(__dirname);
const fileList = listFiles(rootDir);

console.log(fileList.join('\n'));
