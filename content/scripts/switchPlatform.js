const fs = require('fs');
const path = require('path');

function switchPlatform(platform) {
    const platformPath = path.join('.obsidian', 'platforms', platform);
    const obsidianPath = '.obsidian';
    
    // 备份当前配置
    if (fs.existsSync(obsidianPath)) {
        // 保存当前配置到对应平台目录
        // ...
    }
    
    // 应用目标平台配置
    // ...
}

// 使用示例：
// node switchPlatform.js desktop
// node switchPlatform.js mobile 