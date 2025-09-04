import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWind3,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: [
    ],
    theme: {
        colors: {},
        breakpoints: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        height: {},
        lineHeight: {},
        spacing: {},
        fontFamily: {},
        boxShadow: {},
    },
    presets: [
        // 默认预设，包括Tailwind CSS, Windi CSS, Bootstrap,是这些的通用超集
        presetWind3(),
        // 属性化预设。用于将属性分组，提高代码可读
        presetAttributify(),
        presetIcons(),
        presetTypography(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
