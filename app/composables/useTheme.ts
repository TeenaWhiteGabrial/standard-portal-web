import type { ThemeConfig, ThemeApiResponse } from '~~/shared/types/theme'
import { defaultTheme } from '~~/shared/types/theme'

// 全局主题状态
const themeConfig = ref<ThemeConfig>(defaultTheme)

/**
 * 将 HEX 颜色转换为 HSL
 */
function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        h /= 6
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

/**
 * 将 HSL 颜色转换为 HEX
 */
function hslToHex(h: number, s: number, l: number): string {
    h = h % 360
    s = Math.max(0, Math.min(100, s)) / 100
    l = Math.max(0, Math.min(100, l)) / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2

    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * 根据主题色衍生其他颜色
 */
function deriveColors(primaryColor: string): ThemeConfig {
    const [h, s, l] = hexToHsl(primaryColor)

    return {
        primary: primaryColor,
        primaryHover: hslToHex(h, s, Math.max(10, l - 10)),     // 悬浮时稍深
        primaryActive: hslToHex(h, s, Math.max(5, l - 15)),     // 激活时更深
        primaryLight: hslToHex(h, Math.max(10, s - 20), Math.min(95, l + 30)),  // 浅色版本
        primaryDark: hslToHex(h, Math.min(100, s + 10), Math.max(5, l - 25)),   // 深色版本
        primaryText: l > 50 ? '#ffffff' : '#000000'              // 根据亮度选择文字颜色
    }
}

/**
 * 将衍生的颜色应用到 CSS 变量
 */
function applyColorsToCSS(colors: ThemeConfig): void {
    if (import.meta.client) {
        const root = document.documentElement

        // 设置主题相关的 CSS 变量
        root.style.setProperty('--color-primary', colors.primary)
        root.style.setProperty('--color-primary-hover', colors.primaryHover)
        root.style.setProperty('--color-primary-active', colors.primaryActive)
        root.style.setProperty('--color-primary-light', colors.primaryLight)
        root.style.setProperty('--color-primary-dark', colors.primaryDark)
        root.style.setProperty('--color-primary-text', colors.primaryText)
    }
}

/**
 * 主题色 Composable
 */
export const useTheme = () => {
    /**
     * 从 API 获取主题配置
     */
    const fetchThemeConfig = async (): Promise<void> => {
        try {
            // 调用 API 获取主题色
            const response = await $fetch<ThemeApiResponse>('/api/theme/config')

            if (response.success && response.data) {
                const primaryColor = response.data

                // 衍生颜色并应用
                const colors = deriveColors(primaryColor)
                themeConfig.value = colors
                applyColorsToCSS(colors)
            } else {
                throw new Error(response.message || '获取主题配置失败')
            }
        } catch (err) {
            console.error('获取主题配置失败:', err)

            // API 失败时使用默认主题
            themeConfig.value = defaultTheme
            applyColorsToCSS(defaultTheme)
        }
    }

    /**
     * 更新主题配置
     */
    const updateTheme = (newTheme: Partial<ThemeConfig>): void => {
        themeConfig.value = { ...themeConfig.value, ...newTheme }
        applyColorsToCSS(themeConfig.value)
    }

    /**
     * 重置为默认主题
     */
    const resetTheme = (): void => {
        themeConfig.value = defaultTheme
        applyColorsToCSS(defaultTheme)
    }

    /**
     * 初始化主题
     */
    const initTheme = async (): Promise<void> => {
        // 首先应用默认主题
        themeConfig.value = defaultTheme
        applyColorsToCSS(defaultTheme)

        // 从 API 获取主题配置
        await fetchThemeConfig()
    }

    return {
        // 状态
        themeConfig,

        // 方法
        fetchThemeConfig,
        updateTheme,
        resetTheme,
        initTheme,
        deriveColors
    }
}