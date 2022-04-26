import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  listItems(){
    return this.http.get(environment.serverUrl + 'items', 
    {withCredentials: true, responseType: 'text'});
  }

  getItem(id: string){
    return this.http.post(environment.serverUrl + 'item',
    {'Id': id}, 
    {withCredentials: true, responseType: 'text'});
  }
}
