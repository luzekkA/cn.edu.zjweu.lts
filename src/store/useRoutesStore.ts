import { defineStore } from 'pinia'
import { Names } from './store-name'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, staticRoutes } from '../router/index'
export const useRoutesStore = defineStore(Names.ROUTESSTORE, {
    state: () => {
        return {
            routesList: [] as Array<RouteRecordRaw>,
            //  routesList: [] as any,
        }
    },
    actions: {
        generateRoutes(roles: string[]): Array<RouteRecordRaw> {
            let accessedRoutes: Array<RouteRecordRaw>
            this.routesList = []
            accessedRoutes = this.filterAsyncRoutes(roles, asyncRoutes)
            //递归过滤隐藏页面
            let TempRoutes: Array<RouteRecordRaw> = staticRoutes
            TempRoutes = this.filterHidden(TempRoutes)
            TempRoutes.forEach((route) => {
                if (!route?.meta?.hidden) {
                    this.routesList.push(route)
                }
            })
            TempRoutes = accessedRoutes
            TempRoutes = this.filterHidden(TempRoutes)
            TempRoutes.forEach((route) => {
                if (!route?.meta?.hidden) {
                    this.routesList.push(route)
                }
            })


            console.log(this.routesList, "this is routesList")
            return accessedRoutes

        }
        ,
        //用于递归生成动态路由
        filterAsyncRoutes(roles: string[], routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
            const res: Array<RouteRecordRaw> = []

            routes.forEach(route => {
                const tmp = { ...route }
                if (this.hasPermission(roles, tmp)) {
                    if (tmp.children) {
                        tmp.children = this.filterAsyncRoutes(roles, tmp.children)
                    }
                    res.push(tmp)
                }
            })

            return res
        },
        
        //用于判断每一条路由的权限
        hasPermission(roles: string[], route: RouteRecordRaw) {
            if (route.meta && route.meta.roles) {
                return roles.some(role => ((route.meta as any).roles as string[]).includes(role))
            } else {
                return true
            }
        },
        filterHidden(routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
            const res: Array<RouteRecordRaw> = []

            routes.forEach(route => {
                const tmp = { ...route }
                if (this.IsHidden(tmp)) {
                    if (tmp.children) {
                        tmp.children = this.filterHidden(tmp.children)
                    }
                    res.push(tmp)
                }
            })

            return res
        },
        IsHidden(route: RouteRecordRaw){
            if (route.meta && route.meta.hidden) {
                return !route.meta.hidden
            } else {
                return true
            }
        },
    }
})