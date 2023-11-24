import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: () => import('../components/Welcome.vue')
            },
            {
                path: '/user',
                name: 'User',
                component: () => import('../components/User.vue')
            },
            {
                path: '/table',
                name: 'Table',
                component: () => import('../components/Table.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router