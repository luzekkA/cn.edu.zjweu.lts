import { settings,Env } from "../settings";
import { useUserStore } from "../store/useUserStore";
import { getToken } from "./auth";
import { ElMessage, ElMessageBox } from "element-plus";
import axios, { AxiosInstance } from 'axios'

let baseURL = ''
if (settings.env==Env.Mock) {
    baseURL = settings.mockURL
}
else if (settings.env==Env.Dev){
    baseURL = settings.baseURL
}
const service: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

service.interceptors.request.use(
    (config: any) => {
        // 在发送请求之前做些什么
        const userStore =  useUserStore()
        // const userstore = getUserStore();
        if (userStore.token) {
            config.headers['token'] = getToken()
        }
        return config;
    },
    (error: any) => {
        // 处理请求错误
        console.log(error)
        return Promise.reject(error)
    },

)
service.interceptors.response.use(
    (response: any) => {
        const userStore =  useUserStore()
        const res = response.data
        // 对响应数据做点什么
        if (res.code != 20000) {
            ElMessage.error(res.message || 'Error')
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                ElMessageBox.confirm('你已经被登出，你可以取消以留在此页面，或者再次登录', '登出确认', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消登录',
                    type: 'warning'
                }).then(() => {
                    userStore.resetToken()
                    location.reload()
                })
            }
            if (res && res.message) {
                return Promise.reject(new Error(res.message));
            } else {
                return Promise.reject(new Error('Error'));
            }
        } else {
            return res;
        }
    },
    (error: any) => {
        // 处理响应错误
        console.log('err' + error)
        ElMessage.error(error.message || 'Error')
        return Promise.reject(error);
    },
);

export default service;

