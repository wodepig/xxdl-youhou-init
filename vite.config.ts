import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn,util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    // 开启代码压缩
    minify: false,
  },
  plugins: [
 
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        license: 'MIT',
        description: '油猴快速开发',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.baidu.com/*'],
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
          [
            'element-plus',
            cdn.jsdelivr('ElementPlus@2.8.5', 'dist/index.full.min.js'),
          ],
          [
            'jquery',
            cdn.jsdelivr('jQuery@3.7.1','dist/jquery.min.js')
        ]
        ],
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
        
      },
    }),
  ],
});
