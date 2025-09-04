<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo 区域 -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img
              class="h-8 w-auto"
              src="/favicon.ico"
              alt="Logo"
            />
            <span class="ml-2 text-xl font-bold text-gray-900">标准门户</span>
          </NuxtLink>
        </div>

        <!-- 中间导航菜单 -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <div
              v-for="item in navigationItems"
              :key="item.name"
              class="relative group"
              @mouseenter="handleMouseEnter(item)"
              @mouseleave="handleMouseLeave"
            >
              <button
                class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                :class="{ 'text-blue-600': activeDropdown === item.name }"
              >
                {{ item.name }}
                <svg
                  class="ml-1 h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': activeDropdown === item.name }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- 一级下拉菜单 -->
              <div
                v-if="activeDropdown === item.name && item.children"
                class="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                @mouseenter="keepDropdownOpen"
                @mouseleave="handleMouseLeave"
              >
                <div class="py-1">
                  <div
                    v-for="child in item.children"
                    :key="child.name"
                    class="relative group/child"
                    @mouseenter="handleChildMouseEnter(child)"
                  >
                    <NuxtLink
                      v-if="!child.children"
                      :to="child.href || '#'"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {{ child.name }}
                    </NuxtLink>
                    <button
                      v-else
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
                    >
                      {{ child.name }}
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <!-- 二级下拉菜单 -->
                    <div
                      v-if="child.children && activeSecondLevel === child.name"
                      class="absolute left-full top-0 mt-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      <div class="py-1">
                        <div
                          v-for="grandchild in child.children"
                          :key="grandchild.name"
                          class="relative group/grandchild"
                          @mouseenter="handleGrandchildMouseEnter(grandchild)"
                        >
                          <NuxtLink
                            v-if="!grandchild.children"
                            :to="grandchild.href || '#'"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {{ grandchild.name }}
                          </NuxtLink>
                          <button
                            v-else
                            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center justify-between"
                          >
                            {{ grandchild.name }}
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <!-- 三级下拉菜单 -->
                          <div
                            v-if="grandchild.children && activeThirdLevel === grandchild.name"
                            class="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                          >
                            <div class="py-1">
                              <NuxtLink
                                v-for="item3 in grandchild.children"
                                :key="item3.name"
                                :to="item3.href || '#'"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              >
                                {{ item3.name }}
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧登录按钮 -->
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              v-if="!isLoggedIn"
              @click="handleLogin"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              登录
            </button>
            <div v-else class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  :src="userInfo.avatar || '/favicon.ico'"
                  :alt="userInfo.name"
                />
                <span class="ml-2 text-gray-700">{{ userInfo.name }}</span>
              </button>
              
              <!-- 用户菜单下拉 -->
              <div
                v-if="showUserMenu"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人中心</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">设置</a>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <div v-for="item in navigationItems" :key="item.name">
            <button
              @click="toggleMobileDropdown(item.name)"
              class="w-full text-left text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              {{ item.name }}
            </button>
            <div v-if="mobileActiveDropdown === item.name && item.children" class="pl-4">
              <NuxtLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.href || '#'"
                class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <button
              v-if="!isLoggedIn"
              @click="handleLogin"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium"
            >
              登录
            </button>
            <div v-else>
              <div class="flex items-center px-3 py-2">
                <img class="h-8 w-8 rounded-full" :src="userInfo.avatar || '/favicon.ico'" :alt="userInfo.name" />
                <span class="ml-3 text-gray-700">{{ userInfo.name }}</span>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-sm font-medium"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  interface NavigationItem {
    name: string
    href?: string
    children?: NavigationItem[]
  }

  interface UserInfo {
    name: string
    avatar?: string
    email?: string
  }

  // 响应式数据
  const activeDropdown = ref<string | null>(null)
  const activeSecondLevel = ref<string | null>(null)
  const activeThirdLevel = ref<string | null>(null)
  const showMobileMenu = ref(false)
  const mobileActiveDropdown = ref<string | null>(null)
  const showUserMenu = ref(false)
  const isLoggedIn = ref(false)

  // 用户信息
  const userInfo = ref<UserInfo>({
    name: '张三',
    avatar: '/favicon.ico',
    email: 'zhangsan@example.com'
  })

  // 导航菜单数据
  const navigationItems: NavigationItem[] = [
    {
      name: '首页',
      href: '/'
    },
    {
      name: '政务公开',
      children: [
        {
          name: '政府信息公开',
          children: [
            {
              name: '公开指南',
              children: [
                { name: '公开制度', href: '/guide/system' },
                { name: '公开目录', href: '/guide/catalog' },
                { name: '申请流程', href: '/guide/process' }
              ]
            },
            { name: '公开年报', href: '/info/annual' },
            { name: '依申请公开', href: '/info/apply' }
          ]
        },
        {
          name: '政策解读',
          children: [
            { name: '国家政策', href: '/policy/national' },
            { name: '地方政策', href: '/policy/local' },
            { name: '部门政策', href: '/policy/department' }
          ]
        },
        { name: '财政预决算', href: '/finance' }
      ]
    },
    {
      name: '政务服务',
      children: [
        {
          name: '办事服务',
          children: [
            {
              name: '个人办事',
              children: [
                { name: '证件办理', href: '/service/personal/certificate' },
                { name: '社会保障', href: '/service/personal/social' },
                { name: '医疗健康', href: '/service/personal/health' }
              ]
            },
            {
              name: '企业办事',
              children: [
                { name: '企业开办', href: '/service/business/register' },
                { name: '资质许可', href: '/service/business/license' },
                { name: '税务服务', href: '/service/business/tax' }
              ]
            }
          ]
        },
        { name: '服务指南', href: '/service/guide' },
        { name: '办事进度查询', href: '/service/progress' }
      ]
    },
    {
      name: '互动交流',
      children: [
        { name: '领导信箱', href: '/interaction/mailbox' },
        { name: '在线咨询', href: '/interaction/consultation' },
        { name: '意见征集', href: '/interaction/feedback' },
        { name: '网上调查', href: '/interaction/survey' }
      ]
    },
    {
      name: '走进政府',
      children: [
        { name: '政府简介', href: '/about/intro' },
        { name: '领导介绍', href: '/about/leaders' },
        { name: '机构设置', href: '/about/departments' },
        { name: '政府工作报告', href: '/about/reports' }
      ]
    }
  ]

  // 定时器
  let dropdownTimer: NodeJS.Timeout | null = null

  // 鼠标进入一级菜单
  const handleMouseEnter = (item: NavigationItem) => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer)
      dropdownTimer = null
    }
    activeDropdown.value = item.name
    activeSecondLevel.value = null
    activeThirdLevel.value = null
  }

  // 鼠标离开菜单
  const handleMouseLeave = () => {
    dropdownTimer = setTimeout(() => {
      activeDropdown.value = null
      activeSecondLevel.value = null
      activeThirdLevel.value = null
    }, 150)
  }

  // 保持下拉菜单打开
  const keepDropdownOpen = () => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer)
      dropdownTimer = null
    }
  }

  // 鼠标进入二级菜单
  const handleChildMouseEnter = (child: NavigationItem) => {
    if (child.children) {
      activeSecondLevel.value = child.name
      activeThirdLevel.value = null
    }
  }

  // 鼠标进入三级菜单
  const handleGrandchildMouseEnter = (grandchild: NavigationItem) => {
    if (grandchild.children) {
      activeThirdLevel.value = grandchild.name
    }
  }

  // 切换移动端菜单
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  // 切换移动端下拉菜单
  const toggleMobileDropdown = (itemName: string) => {
    mobileActiveDropdown.value = mobileActiveDropdown.value === itemName ? null : itemName
  }

  // 切换用户菜单
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
  }

  // 处理登录
  const handleLogin = () => {
    // 这里可以跳转到登录页面或打开登录模态框
    console.log('跳转到登录页面')
    // 模拟登录成功
    isLoggedIn.value = true
    showMobileMenu.value = false
  }

  // 处理退出登录
  const handleLogout = () => {
    isLoggedIn.value = false
    showUserMenu.value = false
    showMobileMenu.value = false
    console.log('用户已退出登录')
  }

  // 点击外部关闭菜单
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      showUserMenu.value = false
    }
  }

  // 生命周期
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (dropdownTimer) {
      clearTimeout(dropdownTimer)
    }
  })
</script>

<style scoped>
  /* 自定义样式可以在这里添加 */
</style>
