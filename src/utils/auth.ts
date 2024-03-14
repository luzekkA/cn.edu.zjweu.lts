import Cookies from 'js-cookie'
//对cookie中的token进行操作
const TokenKey = 'Token'
export function getToken():string{
    return Cookies.get(TokenKey) as string
}

export function setToken(token:string):string{
    return Cookies.set(TokenKey,token) as string
}

export function removeToken(){
    Cookies.remove(TokenKey)
}