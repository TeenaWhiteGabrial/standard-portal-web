<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-neutral-900 mb-8">主题配置演示</h1>
      
      <!-- 主题状态 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">当前主题状态</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <p><strong>当前主题色:</strong> {{ themeConfig?.primary }}</p>
             <p><strong>系统状态:</strong> 
               <span  class="text-green-500">运行正常</span>
             </p>
           </div>
           <div>
             
             <p class="text-gray-600">主题色会自动衍生出 6 种相关颜色</p>
           </div>
         </div>
      </div>

             <!-- 主题色展示 -->
       <div class="bg-white rounded-lg shadow-md p-6 mb-8">
         <h2 class="text-xl font-semibold text-neutral-900 mb-4">主题色展示</h2>
         <div class="mb-6">
           <h3 class="text-lg font-medium text-neutral-800 mb-3">当前主题色</h3>
           <div class="flex items-center space-x-4 mb-4">
             <div 
               class="w-16 h-16 rounded-lg border-2 border-gray-200"
               :style="{ backgroundColor: themeConfig?.primary }"
             ></div>
             <div>
               <p class="font-mono text-lg">{{ themeConfig?.primary }}</p>
               <p class="text-sm text-gray-600">主题色</p>
             </div>
           </div>
         </div>
         
         <div v-if="themeConfig" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <div 
             v-for="(color, colorName) in themeConfig" 
             :key="colorName"
             class="flex items-center space-x-3"
           >
             <div 
               class="w-12 h-12 rounded border-2 border-gray-200"
               :style="{ backgroundColor: color }"
             ></div>
             <div>
               <p class="font-mono text-sm">{{ color }}</p>
               <p class="text-xs text-gray-600 capitalize">{{ colorName }}</p>
             </div>
           </div>
         </div>
       </div>

      <!-- 组件演示 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">组件演示</h2>
        
                 <!-- 按钮演示 -->
         <div class="mb-6">
           <h3 class="text-lg font-medium text-neutral-800 mb-3">按钮组件</h3>
           <div class="flex flex-wrap gap-3">
             <button class="btn-primary">主要按钮</button>
             <button class="btn-primary-light">浅色按钮</button>
             <button class="btn-primary-outline">轮廓按钮</button>
             <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors">灰色按钮</button>
           </div>
         </div>

         <!-- 文本颜色演示 -->
         <div class="mb-6">
           <h3 class="text-lg font-medium text-neutral-800 mb-3">文本颜色</h3>
           <div class="space-y-2">
             <p class="text-primary">这是主要颜色文本</p>
             <p class="text-primary-hover">这是悬浮颜色文本</p>
             <p class="text-gray-600">这是灰色文本</p>
             <p class="text-gray-900">这是深灰色文本</p>
           </div>
         </div>

         <!-- 背景和边框演示 -->
         <div class="mb-6">
           <h3 class="text-lg font-medium text-neutral-800 mb-3">背景和边框</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div class="p-4 bg-primary-light rounded-lg">浅色背景</div>
             <div class="p-4 border-2 border-primary rounded-lg">主题色边框</div>
             <div class="p-4 bg-primary text-primary-text rounded-lg">主题色背景</div>
           </div>
         </div>
         
         <!-- 主题色修改演示 -->
         <div class="mb-6">
           <h3 class="text-lg font-medium text-neutral-800 mb-3">快速切换主题色</h3>
           <div class="flex flex-wrap gap-3">
             <button 
               v-for="color in presetColors" 
               :key="color.name"
               @click="changeThemeColor(color.value)"
               class="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
               :style="{ backgroundColor: color.value }"
               :title="color.name"
             ></button>
           </div>
         </div>
      </div>

      <!-- 操作按钮 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">主题操作</h2>
        <div class="flex flex-wrap gap-3">
          <button 
            @click="refreshTheme" 
            class="btn-primary"
          >
            
            <span >刷新主题</span>
          </button>
          <button 
            @click="resetToDefault"
            class="btn-secondary"
          >
            重置为默认主题
          </button>
          <button 
            @click="exportTheme"
            class="btn-success"
          >
            导出主题配置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 页面元数据
  useHead({
    title: '主题配置演示 - 标准门户',
    meta: [
      { name: 'description', content: '主题配置演示页面，展示动态主题系统的功能' }
    ]
  })

  // 使用主题管理
  const {
    themeConfig,
    fetchThemeConfig,
    updateTheme,
    resetTheme,
    deriveColors
  } = useTheme()

  // 预设的主题色
  const presetColors = [
    { name: '蓝色', value: '#3b82f6' },
    { name: '绿色', value: '#10b981' },
    { name: '紫色', value: '#8b5cf6' },
    { name: '红色', value: '#ef4444' },
    { name: '橙色', value: '#f59e0b' },
    { name: '青色', value: '#06b6d4' },
    { name: '粉色', value: '#ec4899' },
    { name: '靛蓝', value: '#6366f1' },
  ]

  /**
   * 根据背景色获取合适的文字颜色
   */
  const getTextColor = (backgroundColor: string): string => {
    // 简单的亮度检测，实际项目中可以使用更复杂的算法
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  /**
   * 刷新主题
   */
  const refreshTheme = async () => {
    await fetchThemeConfig()
  }

  /**
   * 重置为默认主题
   */
  const resetToDefault = () => {
    resetTheme()
  }

  /**
 * 切换主题色
 */
  const changeThemeColor = (primaryColor: string) => {
    // 从基础颜色衍生完整的主题配置
    const derivedTheme = deriveColors(primaryColor)
    updateTheme(derivedTheme)
  }

  /**
   * 导出主题配置
   */
  const exportTheme = () => {
    const dataStr = JSON.stringify(themeConfig.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `theme-config-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
</script>

<style scoped>
  /* 组件特定样式 */
</style>
