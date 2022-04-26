import { Component, OnInit } from '@angular/core';
import { UserService } from '../utils/user.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService) { }

  username: string = "";
  password: string = "";
  email: string = "";
  usr: any;
  isLoaded: boolean = false;

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('uid') ?? "").subscribe(data =>{
      //console.log(data);
       var jsonObject = JSON.parse(data.body ?? "");
       this.usr = <user>jsonObject;
       this.isLoaded = true;
     }, error =>{
       console.log(error);
     })
  }

  updateUser(){
    this.userService.setUser(localStorage.getItem('uid') ?? "", this.usr.username, this.usr.password, this.usr.email).subscribe();
  }

}

export interface user {
  username: string;
  email: string;
  password: string;
  
}
