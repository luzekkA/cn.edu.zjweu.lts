import { defineStore } from 'pinia'
import {getToken,setToken,removeToken} from '../utils/auth'
import { Names } from './store-name'
import { getInfo,login,logout} from '../api/user'
import {resetRouter} from '../router/index'
export const useUserStore = defineStore(Names.USERSTORE, {
    state: () => {
        return {
            //用户身份列表
            userRolesList: [] as string[],
            //从cookie中获取token
            token:getToken(),
            //用户头像url地址
            avatar:'',
            //用户名
            name:'',
            id:'',
            phone:'',
            temp_teamId:''
        }
    },
    getters: {
        // UserRolesList(): string[] {
        //     return this.userRolesList
        // },
        // Token():string{
        //     return this.token
        // }

    },
    actions: {
        login(userInfo:any) {
            const { id, password } = userInfo
            return new Promise((resolve , reject)=> {
              login({ id: id.trim(), password: password }).then(response => {
                const { data } = response
                this.token = data.token
                setToken(data.token)
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
          },
        getInfo(){
            return new Promise((resolve,reject) => {
                getInfo(this.token).then(response => {
                 const {data} = response
                 if(!data){
                    reject("验证失败请重新登录")
                 }
                 const {roles,username,ico,id,phone} = data
                 if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                  }
                  this.userRolesList = roles
                  this.name = username
                  this.avatar = ico
                  this.id = id
                  this.phone = phone
                  resolve(data)
                }).catch(error => {
                  reject(error)
                })
              })
        },
        logout() {
          return new Promise((resolve, reject) => {
            logout(this.token)
              .then(() => {
                this.token = ''
                this.userRolesList = []
                removeToken()
                resetRouter()
      
                // // reset visited views and cached views
                // // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                // dispatch('tagsView/delAllViews', null, { root: true })
                resolve(true)
              })
              .catch((error) => {
                reject(error)
              })
          })
        },
        //清除token
        resetToken(){
            this.token=''
            this.userRolesList=[]
            removeToken()
        }

    }
})

