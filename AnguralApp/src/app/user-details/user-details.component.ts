import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  userId: any = "0";
  user: any = {
    "id": "",
    "email": "",
    "first_name": "",
    "last_name": "",
    "avatar": ""
  };
  userDetails: String = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

  constructor(private httpService: ApiServiceService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {

        console.log(params.get("id"));
        this.userId = params.get("id");

      }
    )
    this.httpService.getUserById(this.userId).subscribe(
      (response: any) => { console.log(response.data); this.user = response.data },
      (error) => { console.log(error); })
  }

}
