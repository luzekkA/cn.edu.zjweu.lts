import request from '../utils/request'

export function getTeam() {
  return request({
    url: '/team/getteam',
    method: 'get',
  })
}
export function getTeamByUser() {
  return request({
    url: '/team/getteam',
    method: 'get',
  })
}

export function quitTeam(team: any) {
  return request({
    url: '/team/quitteam',
    method: 'delete',
    params: { team }
  })
}

export function quitTeamById(team: any, id: any) {
  return request({
    url: '/team/deleteuser',
    method: 'delete',
    params: { team, id }
  })
}

export function quitTeamByPhone(team: any, phone: any) {
  return request({
    url: '/team/deleteOther',
    method: 'delete',
    params: { team, phone }
  })
}

export function joinTeam(team: any) {
  return request({
    url: '/team/join',
    method: 'post',
    data: team
  })
}

export function createTeam(team: any) {
  return request({
    url: '/team/create',
    method: 'post',
    data: team
  })

}
export function getTeamMember(team: any) {
  return request({
    url: '/team/getuser',
    method: 'get',
    params: { team }
  })
}

export function getEntourage(team: any) {
  return request({
    url: '/team/showOther',
    method: 'get',
    params: { team }
  })
}

export function addEntourage(entourage: any) {
  return request({
    url: '/team/addOther',
    method: 'post',
    data: entourage
  })
}


//选择
export function select(groupViewModel: any) {
  return request({
    url: '/competition/update',
    method: 'post',
    data: groupViewModel
  })
}


//判断用户是否已经填过表
export function isDid(competition: any) {
  return request({
    url: '/competition/hasFill',
    method: 'get',
    params: { competition }
  })
}
//加入
export function joinCompetition(competition_Team:any) {
  return request({
    url: '/competition/join',
    method: 'post',
    data:competition_Team
  })
}

//获取所有用户填过的表
export function showAll(user:any,team:any) {
  return request({
    url: '/competition/AllActions_scores',
    method: 'get',
    params:{user,team}
  })
}