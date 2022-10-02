import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit {

  usersList: any = [];

  constructor(private httpService: ApiServiceService) { }

  ngOnInit(): void {
    this.httpService.getUsers().subscribe(
      (response: any) => { console.log(response.data); this.usersList = response.data },
      (error) => { console.log(error); })
  }

  funRegister(email: any, password: any): void {
    console.log("fun register");
    console.log(email);
    console.log(password);
    var newUser: object = { "email": email, "password": password };
    this.httpService.register(newUser);
  }

  funLogout(): void {
    console.log("fun logout");
    this.httpService.removeData('token');

  }



}
