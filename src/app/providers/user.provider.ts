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
    
    getUsersPerPage(page:string, size?:string): Promise<any> {
      let sizeRoute = "";
      if(size !== undefined)  sizeRoute = `&per_page=${size}`;
      return this.http.get<any>(this.route+`?page=${page}`+sizeRoute).toPromise();
    }
    deleteUser(userId : number): Promise<User>{
      return this.http.delete<User>(this.route + `/${userId}`).toPromise();
    }

    createUser(user: unknown): Promise<User>{
      return this.http.post<User>(this.route, user).toPromise();
    }
  
  }