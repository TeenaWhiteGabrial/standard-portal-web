<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 欢迎区域 -->
    <div class="bg-white rounded-lg shadow-md p-8 mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">欢迎访问标准门户</h1>
      <p class="text-lg text-gray-600 mb-6">
        这是一个功能完整的政府门户网站，包含完整的三级导航菜单系统。
      </p>
      
      <!-- 功能特点 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-900 mb-2">响应式设计</h3>
          <p class="text-blue-700">支持桌面端和移动端，自适应各种屏幕尺寸</p>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-green-900 mb-2">三级导航</h3>
          <p class="text-green-700">完整的三级下拉菜单，支持鼠标悬停和键盘导航</p>
        </div>
        <div class="bg-purple-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-purple-900 mb-2">用户系统</h3>
          <p class="text-purple-700">完整的登录退出功能，用户菜单和权限管理</p>
        </div>
        <div class="bg-orange-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-orange-900 mb-2">动态主题</h3>
          <p class="text-orange-700">支持从接口动态获取主题配置，实现个性化定制</p>
        </div>
      </div>
    </div>

    <!-- 导航说明 -->
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">导航栏功能说明</h2>
      <div class="space-y-4">
        <div class="border-l-4 border-blue-500 pl-4">
          <h3 class="text-lg font-semibold text-gray-900">左侧 LOGO 区域</h3>
          <p class="text-gray-600">点击可返回首页，包含网站标识和名称</p>
        </div>
        <div class="border-l-4 border-green-500 pl-4">
          <h3 class="text-lg font-semibold text-gray-900">中间三级菜单</h3>
          <p class="text-gray-600">
            包含政务公开、政务服务、互动交流、走进政府等主要栏目，
            每个栏目都有完整的二级和三级子菜单
          </p>
        </div>
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-lg font-semibold text-gray-900">右侧登录区域</h3>
          <p class="text-gray-600">
            未登录时显示登录按钮，登录后显示用户头像和姓名，
            点击可展开用户菜单
          </p>
        </div>
        <div class="border-l-4 border-orange-500 pl-4">
          <h3 class="text-lg font-semibold text-gray-900">移动端适配</h3>
          <p class="text-gray-600">
            在小屏幕设备上自动切换为汉堡菜单，保证良好的移动端体验
          </p>
        </div>
      </div>
    </div>

    <!-- 主题演示链接 -->
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">主题配置系统</h2>
      <p class="text-gray-600 mb-6">
        本项目已集成完整的动态主题配置系统，支持从 API 接口动态获取主题色配置，
        实现真正的个性化定制。主题配置包含完整的色彩体系，支持主题色、辅助色、
        状态色等多种颜色配置。
      </p>
      <div class="flex flex-wrap gap-4">
        <NuxtLink 
          to="/theme-demo" 
          class="btn-primary"
        >
          查看主题演示
        </NuxtLink>
        <button 
          @click="refreshTheme" 
          class="btn-primary-outline"
          :disabled="isRefreshing"
        >
          {{ isRefreshing ? '刷新中...' : '刷新主题' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 页面元数据
  useHead({
    title: '首页 - 标准门户',
    meta: [
      { name: 'description', content: '标准门户网站首页，提供政务公开、政务服务等功能' }
    ]
  })

  // 使用主题管理
  const { fetchThemeConfig } = useTheme()
  const isRefreshing = ref(false)

  /**
   * 刷新主题
   */
  const refreshTheme = async () => {
    isRefreshing.value = true
    try {
      await fetchThemeConfig()
    } finally {
      isRefreshing.value = false
    }
  }
</script>