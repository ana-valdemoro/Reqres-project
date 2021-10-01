import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.scss']
})
export class UserListComponentComponent implements OnInit {
  users: User[] = [];
  userSubscription: Subscription | undefined;
  constructor(private userService: UserService) { }
  pageSize: number = 6;
  page: number = 1 ;
  total: number = 12;
  ngOnInit(): void {
    this.subscribeToUserList();
    this.getUserPerPage();
  }
  getUserPerPage() {
    this.userService.requestUserBatch(this.page.toString())
      .then(res => {
        this.pageSize = res.per_page;
        this.page = res.page;
        this.total = res.total;
      });
  }
  subscribeToUserList() {
    this.userSubscription = this.userService.getUsersList().subscribe(users => {
      this.users = users;
    })

  }

  requestUserRemoval(id: number) {
    this.userService.deleteUserFromList(id);
  }
  tabSize(event: number) {
    this.page = event;
    this.getUserPerPage();
  }


}
