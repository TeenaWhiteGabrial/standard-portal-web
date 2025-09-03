<template>
    <h1>{{ title }}</h1>
    <h1>{{ headertitle }}</h1>
</template>
<script setup lang="ts">
    const { title } = defineProps({
        title: {
            type: String,
            default: '未正确加载'
        },
        headertitle: {
            type: String,
            default: '未正确加载'
        }
    })
</script>