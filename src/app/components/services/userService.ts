import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/models/User";
import { UserProvider } from "src/app/providers/user.provider";


@Injectable({
    providedIn: 'root'
  })
export class UserService  {
    private userList$  = new BehaviorSubject<User[]>([]);
    private users : User[] = [];

    constructor(private userProvider: UserProvider) {
        this.initializeUserService("1");
    }

    initializeUserService(page: string){
        this.userProvider.getUsers(page).then(users =>{
            this.users = users;
            this.setUserList(users);
        });
    }

    setUserList(users: User[]) {
        this.userList$.next(users);
    }

    getUsersList():Observable<User[]> {
        return this.userList$.asObservable();
    }

    deleteUserFromList(id:number): void{
        this.userProvider.deleteUser(id)
        .then( () =>{
            this.users = this.users.filter( (user)=> user.id!== id );
            this.setUserList(this.users);
        });
    }

}
