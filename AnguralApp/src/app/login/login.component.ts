import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
  }
  funLogin(email: any, password: any): void {
    console.log("fun login");
    var loginCredentials: object = { "email": email, "password": password };
    this.httpService.login(loginCredentials).subscribe(
      res => {
        if (res.token) {
          this.httpService.saveData("token", res.token);
          this._router.navigateByUrl('/users');
        }
        else {
          console.log("Login failed!");
        }
      }
    );

  }
}
