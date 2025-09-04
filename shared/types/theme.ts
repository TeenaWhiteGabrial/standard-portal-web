// 主题配置类型定义
export interface ThemeConfig {
    primary: string          // 主题色
    primaryHover: string     // 悬浮色（稍深）
    primaryActive: string    // 激活色（更深）
    primaryLight: string     // 浅色版本
    primaryDark: string      // 深色版本
    primaryText: string      // 主题色上的文字颜色
}

// API 响应类型
export interface ThemeApiResponse {
    success: boolean
    data: string // 直接返回色号字符串
    message?: string
}

// 默认主题配置
export const defaultTheme: ThemeConfig = {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryActive: '#1d4ed8',
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
    primaryText: '#ffffff'
}