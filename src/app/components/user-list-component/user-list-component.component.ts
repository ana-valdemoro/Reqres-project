import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.scss']
})
export class UserListComponentComponent implements OnInit {
  users: User[] = [];
  userSubscription: Subscription | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscribeToUserList();
  }
  subscribeToUserList() {
    this.userSubscription = this.userService.getUsersList().subscribe(users => {
      this.users = users;
    })

  }

  requestUserRemoval(id: number) {
    this.userService.deleteUserFromList(id);
  }


}
