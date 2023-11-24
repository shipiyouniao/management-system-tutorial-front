<template>
    <div class="index">
        <div class="left">
            <el-menu :default-active="activeIndex" class="el-menu" :collapse="isCollapse" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
                <div class="main-title"><span v-if="!isCollapse">XX管理系统</span></div>
                <el-menu-item index="1" @click="router.push('/welcome')">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span slot="title">欢迎</span>
                </el-menu-item>
                <el-menu-item index="2" @click="router.push('/user')">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span slot="title">管理页</span>
                </el-menu-item>
                <el-menu-item index="3" @click="router.push('/table')">
                    <el-icon>
                        <DataBoard />
                    </el-icon>
                    <span slot="title">查询表格</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <div class="header">
                <div class="left">
                    <el-icon @click="toggleCollapse">
                        <Expand v-if="isCollapse" />
                        <Fold v-else />
                    </el-icon>
                </div>
                <div class="right">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <el-icon>
                        <QuestionFilled />
                    </el-icon>
                    <el-avatar :src="avatar" />
                    <span class="username">admin</span>
                    <el-icon>
                        <ChatLineRound />
                    </el-icon>
                </div>
            </div>
            <router-view class="router-view" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.index {
    display: flex;
    width: 100%;
    height: 100%;

    .left {
        height: 100%;

        .el-menu {
            height: 100%;

            .main-title {
                height: 6rem;
                line-height: 2rem;
                font-size: 2rem;
                font-weight: 500;
                text-align: center;
                color: #fff;

                span {
                    display: block;
                    padding: 2rem 0;
                }
            }

            .el-menu-item {
                height: 6rem;
                line-height: 6rem;
                font-size: 1.5rem;
                font-weight: 500;
                cursor: pointer;

                .el-icon {
                    font-size: 2rem;
                    margin-right: 1rem;
                }

                span {
                    display: inline-block;
                    width: 12rem;
                    text-align: left;
                }
            }
        }
    }

    .right {
        width: 100%;
        height: 100%;

        .header {
            height: 6rem;
            line-height: 6rem;
            padding: 0 2rem;
            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            z-index: 1;
            position: relative;
            display: flex;
            justify-content: space-between;

            .el-icon {
                font-size: 2rem;
                cursor: pointer;
                margin: 0 1rem;
            }

            .right {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .username {
                    margin: 0 1rem 0 0.1rem;
                    height: 1rem;
                    line-height: 1rem;
                }

                .el-avatar {
                    margin: 0 1rem;
                    cursor: pointer;
                }
            }
        }

        .router-view {
            width: 100%;
            height: calc(100% - 6rem);
            background-color: aliceblue;
            padding: 2rem;
            box-sizing: border-box;
            overflow: auto;
        }
    }
}
</style>

<script lang="ts" setup>
import { useRoute, useRouter, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { ref, onMounted, Ref } from 'vue'
import avatar from '@/assets/avatar.jpg'

const isCollapse: Ref<boolean> = ref(false)
const activeIndex: Ref<string> = ref('1')
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

onMounted(async () => {
    await router.isReady();

    if (new RegExp('welcome').test(route.path)) {
        activeIndex.value = '1'
    } else if (new RegExp('user').test(route.path)) {
        activeIndex.value = '2'
    } else if (new RegExp('table').test(route.path)) {
        activeIndex.value = '3'
    }
});

/**
 * @discription: 侧边栏折叠
 */
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
    const mainTitle: Ref<HTMLElement | null> = ref(document.querySelector('.main-title span') as HTMLElement)
    if (isCollapse.value) {
        mainTitle.value.style.display = 'none'
    }
}
</script>