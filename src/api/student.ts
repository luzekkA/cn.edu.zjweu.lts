import request from '../utils/request'
// export const uploadReportURL = 'http://127.0.0.1:5223/api/Student/AddReport'
export function getCourses(pageNumber:any,pageSize = 10) {
    return request({
        url: '/Student/AllCourse',
        method: 'get',
        params:{pageNumber,pageSize}
    })
}

export function getCourseTopic(CourseId:any,pageNumber:any,pageSize = 10){
    return request({
        url: '/Student/CourseTopic',
        method: 'get',
        params:{CourseId,pageNumber,pageSize}
    })  
}

export function getTopicInfo(TopicId:any){
    return request({
        url: '/Student/TopicInfo',
        method: 'get',
        params:{TopicId}
    })  
}

export function getReportInfo(TopicId:any){
    return request({
        url: '/Student/ReportInfo',
        method: 'get',
        params:{TopicId}
    })  
}
export function uploadReport(formData: any) {
    return request({
        url: '/Student/AddReport',
        method: 'post',
        data: formData,
    })
}

export function updateReport(formData: any,reportId:any) {
    return request({
        url: '/Student/UpdateReport',
        method: 'patch',
        params:{reportId},
        data: formData,
    })
}