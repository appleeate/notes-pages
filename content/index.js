const fs = require('fs');
const path = require('path');

// 定义目录结构
const structure = {
  '基础篇': ['HTML', 'CSS', 'JavaScript'],
  '进阶篇': ['前端框架', '状态管理', '构建工具'],
  '工程化篇': ['版本控制', '代码规范', '测试', '性能优化'],
  '工具与资源': ['开发工具', '资源推荐'],
  '项目实战': ['项目搭建', '常见功能实现', '部署与运维'],
  '学习计划': ['学习路线', '面试准备'],
  '其他': ['前端趋势', '个人总结']
};

// 创建目录的函数
function createDirectory(basePath, structure) {
  for (const [folder, subFolders] of Object.entries(structure)) {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`创建文件夹: ${folderPath}`);
    }

    if (Array.isArray(subFolders)) {
      subFolders.forEach(subFolder => {
        const subFolderPath = path.join(folderPath, subFolder);
        if (!fs.existsSync(subFolderPath)) {
          fs.mkdirSync(subFolderPath);
          console.log(`创建子文件夹: ${subFolderPath}`);
        }
      });
    } else if (typeof subFolders === 'object') {
      createDirectory(folderPath, subFolders);
    }
  }
}

// 设置根目录
const rootDir = './前端笔记';

// 创建目录结构
createDirectory(rootDir, structure);

console.log('目录结构创建完成！');