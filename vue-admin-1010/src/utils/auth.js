import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const usernameKey = "username";
const username111 = "info";
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setUserName(value){
  return Cookies.set(usernameKey, value);
}

export function getUserName(){
  return Cookies.get(usernameKey);
}

export function removeUserName(){
  return Cookies.remove(usernameKey);
}

export function setinfo(value){
  return Cookies.set(username111, value);
}

export function getinfo(){
  return Cookies.get(username111);
}

export function removeinfo(){
  return Cookies.remove(username111);
}
