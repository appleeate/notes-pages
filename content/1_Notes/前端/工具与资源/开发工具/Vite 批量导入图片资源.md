#### **批量导入图片资源**

在前端开发中，经常需要批量导入图片资源（如 PNG、SVG 文件）。以下是一个基于 **Vite** 和 **ES Module** 的实用工具代码，可以自动导入指定目录下的所有图片文件，并生成一个键值对映射。

##### **代码实现**
``` typescript
// 批量导入所有 PNG 和 SVG 文件
const images: Record<string, { default: string }> = import.meta.glob([
  '@/assets/img/bulkImport/*.png', // 你的图片资源路径
  '@/assets/img/bulkImport/*.svg'
], { eager: true });

// 生成图片资源映射
export const imageMap = Object.entries(images).reduce((acc, [path, module]) => {
  // 获取文件名作为 key（不含扩展名）
  const key = path.split('/').pop()?.split('.')[0] || '';
  acc[key] = module.default;
  return acc;
}, {} as Record<string, string>);
```
##### **代码说明**

1. **`import.meta.glob`**：
    
    - 是 Vite 提供的动态导入方法，用于批量导入文件。
        
    - `eager: true` 表示立即加载所有匹配的文件。
        
2. **`Object.entries` 和 `reduce`**：
    
    - 将导入的图片资源转换为键值对映射，键为文件名（不含扩展名），值为图片的 URL。
        
3. **`path.split('/').pop()?.split('.')[0]`**：
    
    - 从文件路径中提取文件名，并去除扩展名。
        

##### **使用场景**

- **图标管理**：批量导入图标文件，方便在组件中使用。
    
- **图片资源管理**：统一管理项目中使用的图片资源，避免手动导入。
    

##### **示例**

假设 `@/assets/img/bulkImport/` 目录下有如下文件：

- `logo.png`
    
- `icon.svg`
    

> 生成的 `imageMap` 为：

```javascript
{
  logo: '/assets/img/bulkImport/logo.png',
  icon: '/assets/img/bulkImport/icon.svg'
}
```

> 在组件中使用

``` javascript
import { imageMap } from '@/utils/imageMap';

console.log(imageMap.logo); // 输出：/assets/img/bulkImport/logo.png
```

**警告** `import.meta.glob` 的参数 必须是字符串字面量
详见 [[动态导入的路径必须是字符串字面量]]