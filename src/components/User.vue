<template>
    <div class="user">
        <div class="text-box">
            <span class="position">首页 / 用户</span>
            <h1>用户</h1>
        </div>
    </div>
</template>

<style lang="less" scoped>
.user {
    .text-box {
        width: 100%;
        height: 10rem;
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        text-align: left;
        padding: 2rem;
        box-sizing: border-box;

        .position {
            font-size: 1rem;
            color: #999;
        }

        h1 {
            font-size: 2rem;
            color: #303133;
            margin-top: 2rem;
        }
    }
}
</style>

<script lang="ts" setup>
</script>