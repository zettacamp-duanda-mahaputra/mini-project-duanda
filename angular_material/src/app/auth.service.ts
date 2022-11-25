import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    let data:any = localStorage.getItem('user')
    let user = JSON.parse(data)
    return user
  }

  getToken(){
    let user = this.getUser()
    return user?.token
  }

  getUserId(){
    let user = this.getUser()
    return user?._id
  }

  getRole(){
    let user = this.getUser()
    return user?.userType?.role
  }

  clearUser(){
    localStorage.removeItem('user')
  }

  
}
