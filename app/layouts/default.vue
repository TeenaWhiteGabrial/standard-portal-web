<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <HeaderApolloNavbar />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  // 导入导航栏组件
</script>
