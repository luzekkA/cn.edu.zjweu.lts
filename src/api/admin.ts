import request from '../utils/request'
// export const uploadStudentURL = 'http://127.0.0.1:5223/api/Admin/AddUser_Excel'
//export const uploadClassURL = 'http://127.0.0.1:5223/api/Admin/AddClass'
//获取用户信息
export function getUser(keyWord: any,pageNumber:number,pageSize = 10 ) {
    return request({
        url: '/Admin/GetUser',
        method: 'get',
        params:{keyWord,pageNumber,pageSize}
    })
}
export function getAllUsers(pageNumber:number,pageSize = 10) {
    return request({
        url: '/Admin/GetAllUsers',
        method: 'get',
        params:{pageNumber,pageSize}
    })
}
//获取题目
export function getTopics(keyWord: any,pageNumber:number,pageSize = 10) {
    return request({
        url: '/Admin/GetTopics',
        method: 'get',
        params:{keyWord,pageNumber,pageSize}
    })
}
//获取题目
export function getAllTopics(pageNumber:number,pageSize = 10) {
    return request({
        url: '/Admin/GetAllTopics',
        method: 'get',
        params:{pageNumber,pageSize}
    })
}

export function getTopicInfo(topicId:any){
    return request({
        url: '/Admin/GetTopicInfo',
        params:{topicId},
        method: 'get'
    })
}

export function getClass(keyWord: any,pageNumber:number,pageSize = 10 ) {
    return request({
        url: '/Admin/GetClasses',
        method: 'get',
        params:{keyWord,pageNumber,pageSize}
    })
}

export function getAllClass(pageNumber:number,pageSize = 10) {
    return request({
        url: '/Admin/GetAllClasses',
        method: 'get',
        params:{pageNumber,pageSize}
    })
}

export function getUserInfo(userId:any){
    return request({
        url: '/Admin/GetUserInfo',
        params:{userId},
        method: 'get'
    })
}

export function upLoadStudent(formData:any){
    return request({
        url:'/Admin/AddUser_Excel',
        method:'post',
        data:formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
    })
}

export function upLoadCourses(formData:any){
    return request({
        url:'/Admin/AddCourse_Excel',
        method:'post',
        data:formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
    })
}

export function getCourses(keyWord: any,pageNumber:number,pageSize = 10 ) {
    return request({
        url: '/Admin/GetCourses',
        method: 'get',
        params:{keyWord,pageNumber,pageSize}
    })
}

export function getAllCourses(pageNumber:number,pageSize = 10) {
    return request({
        url: '/Admin/GetAllCourses',
        method: 'get',
        params:{pageNumber,pageSize}
    })
}

export function updateStudentInfo(studentInfo:any){
    return request({
        url: '/Admin/UpdateStudent',
        method: 'put',
        data:studentInfo
    })
}
export function updateTeacherInfo(teacherInfo:any){
    return request({
        url: '/Admin/UpdateTeacher',
        method: 'put',
        data:teacherInfo
    })
}