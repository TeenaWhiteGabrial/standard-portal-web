<template>
    <div w-full>首页</div>

    <ContentRenderer :value="post || {}" :data="post?.meta" />
</template>
<script setup lang="ts">

    // const fooPost = await queryCollection('content').path('/articles/hello-world').first()
    const { data: post } = await useAsyncData('/', () => {
        return queryCollection('content').path('/carousel/information').first()
    })
</script>