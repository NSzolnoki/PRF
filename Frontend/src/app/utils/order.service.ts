import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(uid: string, items: string, totalPrice: number){
    return this.http.post(environment.serverUrl + 'order',
    {uid: uid, items: items ?? null, totalPrice: totalPrice ?? null},
    {withCredentials: true,
    responseType: 'text', observe: 'response' as 'response'});
  }
}
