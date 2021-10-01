import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
  })
  export class UserProvider{
    route:string = "https://reqres.in/api/users";
    constructor(private http: HttpClient) { 
    }

    getUsers(page:string): Promise<User[]> {
      return this.http.get<any>(this.route+`?page=${page}`).toPromise().then( res =>{
          return res.data;
      });
    }
    
    deleteUser(userId : number): Promise<User>{
      return this.http.delete<User>(this.route + `/${userId}`).toPromise();
    }
  
  }