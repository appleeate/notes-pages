const fs = require('fs');
const path = require('path');

function printTree(dir, indent = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const stat = fs.statSync(filePath);

    console.log(indent + (isLast ? '└── ' : '├── ') + file);

    if (stat.isDirectory()) {
      printTree(filePath, indent + (isLast ? '    ' : '│   '));
    }
  });
}

const targetDir = process.argv[2] || '.'; // 默认当前目录
printTree(targetDir);