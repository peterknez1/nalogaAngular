import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


export interface RegisterResponse {
  status: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private url = 'https://reqres.in/api/';
 

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url + "users?page=2", { headers: new HttpHeaders().set('Authorization', this.getData("token")) });
  }


  register(params: object) {
    console.log("register service");
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(params);
    return this.http.post(this.url + "register", params, { headers }).subscribe();
  }

  login(params: object): Observable<RegisterResponse> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RegisterResponse>(this.url + "login", params, { headers })

  }

  getUserById(id: number) {
    return this.http.get(this.url + "users/" + id, { headers: new HttpHeaders().set('Authorization', this.getData("token")) });
  }

  saveData(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string) : any {
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeData(key: string): any {
    localStorage.removeItem(key);
  }


}
