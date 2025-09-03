<template>
    <div w-full>首页</div>

    <ContentRenderer :value="post" :data="post?.meta" />
</template>
<script setup lang="ts">

    const post = {
        "id": "content/carousel/information.md",
        "title": "Demo演示",
        "body": {
            "type": "minimark",
            "value": [
                [
                    "carousel-policy",
                    {
                        ":title": "author",
                        ":headertitle": "header.description"
                    }
                ]
            ],
        },
        "meta": {
            "author": "孙悟空",
            "date": "2025-09-03",
            "headerTitle": "标题党",
            "header": {
                "content": "标题党1",
                "description": "旨在验证markdown是否可行"
            },
            "summary": "旨在验证markdown是否可行",
            "cover": "/images/cover.jpg"
        },
    }
</script>