import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    jobTitle: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })

  constructor(private httpService: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      console.log("form is invalid");
      console.log(this.registerForm.get('email')?.hasError('Required'));
    }
    else {
      var email: any = this.registerForm.get('email')?.value;
      var password: any = this.registerForm.get('password')?.value;
      this.funRegister(email, password);
    }
    console.warn(this.registerForm.value);
  }

  funRegister(email: any, password: any): void {
    console.log("fun login");
    var loginCredentials: object = { "email": email, "password": password };
    this.httpService.register(loginCredentials).subscribe(
      res => {
        if (res.token) {
          this.httpService.saveData("token", res.token);
          this._router.navigateByUrl('/users');
        }
        else {
          console.log("Registration failed");
        }
      }
    );

  }

}
