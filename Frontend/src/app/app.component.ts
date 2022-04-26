import { Component, OnInit } from '@angular/core';
import { LoginService } from './utils/login.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private loginService: LoginService) {
    
    
  }
  userType: string = '';

  ngOnInit() {
    console.log("App fresh load!");
    this.loginService.userType.subscribe(value => this.userType = value);
    console.log(this.userType);
  }
  


}
