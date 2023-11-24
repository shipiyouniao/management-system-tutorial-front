<script setup lang="ts">
</script>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="less">
:root {
    // 全局css初始化
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    line-height: 1.5em;
    color: #303133;
    box-sizing: border-box;
}

span,
img,
.el-link,
.el-icon {
    vertical-align: middle;
}

li {
    list-style: none;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
}

#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

// 当屏幕宽度小于1600px时，改变rem基准
@media screen and (max-width: 1600px) {
    html {
        font-size: 14px;
    }
}

// 当屏幕宽度大于1600px时，改变rem基准
@media screen and (min-width: 1600px) and (max-width: 2560px) {
    html {
        font-size: 16px;
    }
}

// 4k屏幕
@media screen and (min-width: 2560px) {
    html {
        font-size: 20px;
    }
}

ul,
li {
    margin: 0;
    padding: 0;
}

h1,
h2,
h3,
h4 {
    margin: 0;
}

a {
    text-decoration: none;
    cursor: pointer;
}

p {
    margin: 0;
    padding: 0;
}
</style>
