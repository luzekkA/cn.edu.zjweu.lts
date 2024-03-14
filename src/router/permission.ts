import router from './index'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import getPageTitle from '../utils/get_page_title'
import { getToken } from '../utils/auth'
import { useUserStore } from '../store/useUserStore'
import { useRoutesStore } from '../store/useRoutesStore'
import { ElMessage } from "element-plus";
// import { generateRoutes } from './index';

//白名单
const whiteList = ['/', '/register']
// //计算动态路由
// const { roles } = { roles: ['admin'] }
// // generate accessible routes map 
// const accessRoutes = generateRoutes(roles)
// console.log(accessRoutes, 'this is permission routes')
// // dynamically add accessible routes
// // router.addRoute(accessRoutes)
// accessRoutes.forEach(route => {
//   router.addRoute(route);
// })


console.log('addroute sucsess')
//前置路由守卫
//@ts-ignore
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  
  // // start progress bar
  // // NProgress.start()
  // // 设置页面标题
  // document.title = getPageTitle(to.meta.title as string)
  // // determine whether the user has logged in
  // //获取user token
  // const hasToken = getToken()
  // console.log(hasToken, 'this is token')
  // //如果用户访问的是白名单内的
  // if (whiteList.includes(to.path)) {
  //   console.log('in the white list')
  //   next()
  //   // NProgress.done() 
  // }
  // else {
  //   //用户访问的是白名单外的
  //   //如果用户拥有token
  //   console.log('not in the white list')
  //   if (hasToken) {
  //     const userStore = useUserStore()
  //     console.log('user have token')
  //     //如果用户访问其他页面，需要获取用户角色计算路由
  //     await userStore.getInfo()
  //     try {
  //       //输出所有可行的路由
  //       console.log('All routes:');
  //       router.getRoutes().forEach(route => {
  //         console.log(route.path);
  //       });
  //       console.log(to)
  //       if (to.name !== null && to.name !== undefined) {
  //         if (router.hasRoute(to.name)) {
  //           next();
  //         } else {
  //           next('/'); // 替换为你的默认路由
  //         }
  //       }
  //     }
  //     catch (error) {
  //       // remove token and go to login page to re-login
  //       // await userstore.resetToken()
  //       ElMessage.error(error || 'Has Error')
  //       next('/')
  //       // NProgress.done()
  //     }
  //   }
  //   else {
  //     //用户没有token
  //     console.log('user have no token')
  //     next('/')
  //   }
  // }
  console.log("before each")
  // start progress bar
  // NProgress.start()
  // // set page title
  //设置页面标题
  document.title = getPageTitle(to.meta.title as string)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log("user have token")
    if(to.path === '/register'){
      console.log("user go to register")
      next({ path: '/index' })
      // NProgress.done() 
    }
    if (to.path === '/login') {
      console.log("user go to login")
      // if is logged in, redirect to the home page
      next({ path: '/index' })
      // NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      console.log("user go to else")
      const userStore = useUserStore()
      const routesStore = useRoutesStore()
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = userStore.userRolesList && userStore.userRolesList.length > 0
      if (hasRoles) {
        console.log("user have roles")
        next()
      } else {
        console.log("user have no roles")
        try {
          console.log("trying get roles")
          console.log(await userStore.getInfo(),"this is getting ")
          //获取userInfo
          const { roles } : any = await userStore.getInfo()
          //根据角色生成路由并存到pinia
          const accessRoutes = await  routesStore.generateRoutes(roles)
          console.log(accessRoutes, 'this is permission routes')
          //添加路由
          accessRoutes.forEach(route => {
              router.addRoute(route);
            })
          
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await userStore.resetToken()
          ElMessage.error(error || 'Has Error')
          next('/')
          // NProgress.done()
        }
      }
    }
  } else {
    //用户没有token
    if (whiteList.includes(to.path)) {
      //用户访问白名单
      next()
    } else {
      //访问其他页面跳转到login
      next('/')
      // NProgress.done()
    }
  }
})
//后置路由守卫
router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
