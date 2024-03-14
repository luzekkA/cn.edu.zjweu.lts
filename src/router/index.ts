//引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//定义静态路由
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "login",
        meta:{
            hidden:true
        },
        component: () => import('../views/login.vue')
    }, {
        path: "/register",
        name: "register",
        meta:{
            hidden:true
        },
        component: () => import('../views/register/index.vue')
    }, {
        path: "/index",
        component: () => import('../views/Layout/index.vue'),
        meta: {
            name:"index",
        },
        children: [
            {
                path: '',
                name: "index",
                component: () => import('../views/index.vue'),
            }
        ],
    },{
        path: "/user",
        component: () => import('../views/Layout/index.vue'),
        meta: {
            name:"用户",
        },
        children: [
            {
                path: 'userinfo',
                name: "用户个人信息",
                component: () => import('../views/userinfo/index.vue'),
            }
        ],
    },{
        // path: '/404',
        path: '/:pathMatch(.*)*', 
        meta:{
            hidden:true
        },
        component: () => import('../views/error-page/404.vue'),
    },

]
//定义动态路由
export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: "/team",
        component: () => import('../views/Layout/index.vue'),
        meta: {
            name: '队伍',
            roles: ['admin', 'user', 'teacher', 'editor']
        },
        children: [
            {
                path: 'index',
                name: "我的队伍",
                component: () => import('../views/team/index.vue'),
            },
            {
                path: 'create',
                name: "创建队伍",
                component: () => import('../views/team/create.vue'),
            },
            {
                path: 'info',
                name: "队伍详情",
                meta:{
                    hidden:true
                },
                component: () => import('../views/team/info.vue'),
            },
            {
                path: 'entourage',
                name: "添加随行人员",
                meta:{
                    hidden:true
                },
                component: () => import('../views/team/entourage.vue'),
            },
            {
                path: 'select',
                name: "选择组别/选择小项",
                meta:{
                    hidden:true
                },
                component: () => import('../views/team/select.vue'),
            },
            {
                path: 'form',
                name: "难度报表",
                meta:{
                    hidden:true
                },
                component: () => import('../views/team/difficultyRegistrationForm.vue'),
            }
        ],
    },
    {
        path: "/competition",
        component: () => import('../views/Layout/index.vue'),
        meta: {
            name: '比赛',
            roles: ['admin','user', 'teacher', 'editor']
        },
        children: [
            {
                path: 'create',
                name: "创建比赛",
                meta:{
                    roles: ['admin', 'user', 'teacher', 'editor']
                },
                component: () => import('../views/competition/create.vue'),
            },
            {
                path: 'index',
                name: "比赛详情",
                meta:{
                    roles: ['admin', 'user', 'teacher', 'editor']
                },
                component: () => import('../views/competition/index.vue'),
            }
 
        ]
    },
    {
        path: "/payment",
        component: () => import('../views/Layout/index.vue'),
        meta: {
            name: '缴费相关',
            roles: ['admin','user', 'teacher', 'editor']
        },
        children: [
            {
                path: 'index',
                name: "提交缴费凭证",
                meta:{
                    roles: ['admin', 'user', 'teacher', 'editor']
                },
                component: () => import('../views/payment/index.vue'),
            },
            {
                path: 'check',
                name: "管理人员人工校对",
                meta:{
                    roles: ['admin']
                },
                component: () => import('../views/payment/check.vue'),
            }
 
        ]
    },
]
//静态路由直接添加到router
let router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
})
//重置路由
export function resetRouter() {
    const newRouter = createRouter({
        history: createWebHistory(),
        routes: [],  // 如果routes是undefined，使用空数组
    });
    router = newRouter;
}

//导出router
export default router