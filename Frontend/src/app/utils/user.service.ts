import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(uid: string) {
    return this.http.post(environment.serverUrl + 'user', 
    {uid: uid}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
    }

  setUser(uid: string, username: string, password: string, email: string){
    return this.http.put(environment.serverUrl + 'user',
    {uid: uid, username: username ?? null, password: password ?? null, email: email ?? null},
    {withCredentials: true,
    responseType: 'text', observe: 'response' as 'response'});
  }
   
}
