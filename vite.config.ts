import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn,util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    // 开启代码压缩
    minify: false,
  },
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
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
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
