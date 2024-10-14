// uno.config.ts
import { defineConfig,presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetRemToPx({
            baseFontSize: 4
        }),
        presetUno(),
    ],
})