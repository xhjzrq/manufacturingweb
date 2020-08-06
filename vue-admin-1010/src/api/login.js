import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getlist(name) {
  return request({
    url: '/user/list',
    method: 'get',
    params:{
       name
    }
  })
}

export function deleteuser (id) {
  return request({
    url: '/user/del',
    method: 'get',
    params:{
       id
    }
  })
}

export function insertuser(user) {
  return request({
    url: '/user/save',
    method: 'post',
    data:user
  
  })
}
export function updateuser(user) {
  console.log("ss")
  console.log(user)
  return request({
    url: '/user/update',
    method: 'post',
    data:user
  
  })
}