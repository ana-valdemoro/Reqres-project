import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserProvider } from 'src/app/providers/user.provider';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.scss']
})
export class UserListComponentComponent implements OnInit {
  users: User[] = [];
  constructor(private  userProvider: UserProvider) { }

  ngOnInit(): void {
    this.userProvider.getUsers("1")
      .then( users =>{
        this.users = users;
      });
  }

  requestUserRemoval(id:number){
    this.userProvider.deleteUser(id)
     .then( () =>{
       this.users = this.users.filter( (user)=> user.id!== id );
     });
  }
  

}
