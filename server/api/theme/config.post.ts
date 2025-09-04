import type { ThemeApiResponse } from '~~/shared/types/theme'

export default defineEventHandler(async (event): Promise<ThemeApiResponse> => {
    try {
        const body = await readBody(event)

        // 验证请求体
        if (!body || typeof body !== 'string') {
            throw new Error('无效的请求数据，请发送色号字符串')
        }

        const primaryColor = body.trim()

        // 验证主题色格式（简单的 HEX 格式检查）
        if (!/^#[0-9A-Fa-f]{6}$/.test(primaryColor)) {
            throw new Error('主题色格式无效，请使用 HEX 格式（如 #3b82f6）')
        }

        // 这里应该将主题色保存到数据库或配置文件
        // 目前只是模拟保存操作
        console.log('保存主题色:', primaryColor)

        // 模拟保存延迟
        await new Promise(resolve => setTimeout(resolve, 200))

        return {
            success: true,
            data: primaryColor, // 返回保存的色号
            message: '主题色保存成功'
        }
    } catch (error) {
        console.error('保存主题色失败:', error)

        return {
            success: false,
            data: '',
            message: error instanceof Error ? error.message : '保存主题色失败'
        }
    }
})
