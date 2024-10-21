import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn,util } from 'vite-plugin-monkey';


// https://vitejs.dev/config/
export default defineConfig({
  build:{
    // 开启代码压缩
    minify: false,
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        license: 'MIT',
        description: '油猴快速开发',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.baidu.com/'],
      },
      clientAlias: 'v$v',
      build: {
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
        ],
        
      },
    }),
  ],
});
