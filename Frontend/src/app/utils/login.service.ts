import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private userService: UserService) { }

  userType: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserType());

  login(username: string, password: string) {
    return this.http.post(environment.serverUrl + 'login', 
    {username: username, password: password}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'}); 
  }

  logout() {
    return this.http.post(environment.serverUrl + 'logout', 
    {withCredentials: true, responseType: 'text'});
  }

  register(username: string, password: string, email: string){
    return this.http.post(environment.serverUrl + 'user', 
    {username: username, password: password, email: email}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
  getUserType() {
    if(localStorage.getItem('uid')){
    this.userService.getUser(localStorage.getItem('uid') ?? "").subscribe(user =>{
      //console.log(data);
       var jsonObject = JSON.parse(user.body ?? "");
       this.userType.next(jsonObject['accessLevel']);
       return jsonObject['accessLevel'];
     }, error =>{
       console.log(error);
       return "";
     })
     return "";
    }
    return "";
  }
  removeUserType(){
    this.userType.next("");
  }

}
