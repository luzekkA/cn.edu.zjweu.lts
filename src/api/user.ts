import request from '../utils/request'
//获取用户信息
export function getInfo(token: string) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

//用户登录
export function login(data: any) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function logout(token: string) {
    return request({
        url: '/user/logout',
        method: 'post',
        data: token
    })
}

export function getRoleList() {
    return request({
        url: '/user/rolelist',
        method: 'get',
    })
}
export function register(data: any) {
    return request({
        url: 'user/register',
        method: 'post',
        data,
    })
}
export function edit(data: any) {
    return request({
        url: 'user/edit',
        method: 'post',
        data,
    })
}
//上传一寸照
export function uploadFile(file: any, token: string) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('token', token)
    // formData.append('token', token);
    return request({
        url: '/user/ico',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
//上传难度列表
export function difficultyForm(competition:any,team:any,actions_scores:any) {
    return request({
        url: 'competition/setActions_scores',
        method: 'post',
        data:{
            competition,
            team,
            actions_scores
        },
    })
}

//接收用户的报表信息
export function getDifficultyForm(competition:any,team:any) {
    return request({
        url: 'competition/getActions_scores',
        method: 'get',
        params:{competition,team}
    })
}
//上传支付凭证
export function uploadPayment(file: any, competition: string) {
    const formData = new FormData()
    formData.append('file', file)
    // formData.append('token', token);
    return request({
        url: '/competition/uploadPayment',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params:{competition}
    })
}

//上传支付凭证
export function sure(user: any,team:string, competition: string) {
    return request({
        url: 'competition/sureIsPay',
        method: 'get',
        params:{competition,team,user}
    })
}