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
        // 主题色相关的快捷类
        ['btn-primary', 'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-text px-4 py-2 rounded-md font-medium transition-colors duration-200'],
        ['btn-primary-light', 'bg-primary-light hover:bg-primary text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200'],
        ['btn-primary-outline', 'border border-primary text-primary hover:bg-primary hover:text-primary-text px-4 py-2 rounded-md font-medium transition-colors duration-200'],
    ],
    theme: {
        colors: {
            // 主题色号及其衍生色号，使用 CSS 变量
            primary: {
                DEFAULT: 'var(--color-primary)',
                hover: 'var(--color-primary-hover)',
                active: 'var(--color-primary-active)',
                light: 'var(--color-primary-light)',
                dark: 'var(--color-primary-dark)',
                text: 'var(--color-primary-text)',
            },
        },
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
        presetAttributify(),
        presetIcons(),
        presetTypography(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
