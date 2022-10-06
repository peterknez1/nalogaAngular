import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    password: new FormControl('', [Validators.minLength(4), Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
  })

  constructor(private httpService: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.loginForm.valid) {
      console.log("form is invalid");
      console.log(this.loginForm.get('email')?.hasError('Required'));
    }
    else {
      var email: any = this.loginForm.get('email')?.value;
      var password: any = this.loginForm.get('password')?.value;
      this.funLogin(email, password);
    }
    console.warn(this.loginForm.value);
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
