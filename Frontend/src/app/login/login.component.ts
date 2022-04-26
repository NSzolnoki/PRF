import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  rusername: string;
  rpassword: string;
  remail: string;
  alert: string;
  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.rusername = '';
    this.rpassword = '';
    this.remail = '';
    this.alert = '';
  }
  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe(msg => {
        console.log(msg.body);
        const resp = JSON.parse(msg.body ?? "");
        localStorage.setItem('uid', resp['_id']);
        this.loginService.getUserType();
        this.router.navigate(['/items']);
      }, error => {
        this.alert = error['error'];
        console.log(error);
      })
    }
  }
  register(){
    if (this.rusername != '' && this.rpassword != '' && this.remail != '') {
      this.loginService.register(this.rusername, this.rpassword, this.remail).subscribe(msg => {
        console.log(msg);
        const resp = JSON.parse(msg.body ?? "");
        localStorage.setItem('uid', resp['_id']);
        this.router.navigate(['/items']);
      }, error => {
        this.alert = error['error'];
        console.log(error);
      })
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      localStorage.removeItem('uid');
      this.loginService.removeUserType();
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      })
    }
  }
}
