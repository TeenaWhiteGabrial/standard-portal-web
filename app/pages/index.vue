<template>
    <div w-full>首页</div>
    <ContentRenderer :value="post || {}" />
</template>
<script setup lang="ts">
    // const fooPost = await queryCollection('content').path('/articles/hello-world').first()
    const { data: post } = await useAsyncData('/', () => {
        return queryCollection('content').path('/articles/hello-world').first()
    })
</script>