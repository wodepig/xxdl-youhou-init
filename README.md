# 一个油猴的快速开发脚手架
从[原项目](https://github.com/lisonge/vite-plugin-monkey)中扩展得到的
使用到的技术:
ts
vue3
jQuery
Element-Plus
unocss

# 添加一个依赖
如elemen:
```
pnpm install element-plus
```

# 用到的命令

### 添加自动导入
pnpm add -D unplugin-auto-import

### 添加element-plus
pnpm install element-plus

添加对应的@require
> 我也不知道为啥这样写,参考: https://github.com/lisonge/vite-plugin-monkey/issues/5

```
// vite.config.ts
//monkey.build
externalGlobals:  [
          [
            'vue',
            cdn
                .jsdelivr('Vue', 'dist/vue.global.prod.js')
                .concat(
                    cdn.jsdelivr('', 'lib/index.iife.js')[1]('latest', 'vue-demi'),
                )
                .concat(util.dataUrl(';window.Vue=Vue;')),
          ],
          [
            'element-plus',
            cdn.jsdelivr('ElementPlus@2.8.5', 'dist/index.full.min.js'),
          ],
        ]
```

main.js里使用element
```
...省略...
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
...省略...
app.use(ElementPlus);
```
### 添加unocss
参考
https://unocss.nodejs.cn/integrations/vite
https://unocss.net/presets/rem-to-px
安装
pnpm add -D unocss
安装像素转换
```
pnpm add -D @unocss/preset-rem-to-px
```
main.ts中引入
```
import 'virtual:uno.css'
```