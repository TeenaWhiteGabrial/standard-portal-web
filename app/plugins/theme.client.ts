export default defineNuxtPlugin(async () => {
    // 只在客户端执行
    if (import.meta.client) {
        const { initTheme } = useTheme()

        try {
            // 初始化主题配置
            await initTheme()
            console.log('主题配置初始化成功')
        } catch (error) {
            console.error('主题配置初始化失败:', error)
        }
    }
})
