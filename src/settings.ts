interface Settings{
    title:string;
    baseURL:string;
    mockURL:string;
    env:Env
}
//环境变量类型
//mock时可以使用前端模拟api
export enum Env{
    Mock='mock',
    Dev = 'dev',
    Pro = 'pro'
 }
export const settings:Settings ={
    title:'赛事报名系统',
    env:Env.Dev,
    baseURL:"http://127.0.0.1:8085",
    mockURL:'http://127.0.0.1:8088',
}