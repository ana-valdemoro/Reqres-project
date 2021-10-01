import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/components/services/userService';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.scss']
})
export class UserListComponentComponent implements OnInit {
  users: User[] = [];
  userSubscription: Subscription | undefined;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  pageSize: number = 6;
  page: number = 1;
  total: number = 12;
  ngOnInit(): void {
    this.checkForQueryParams();
    this.subscribeToUserList();
    this.getUserPerPage();
  }

  checkForQueryParams() {
    this.route.queryParamMap.subscribe(params => {
      let page = params.get('page');
      if (page !== null) this.page = parseInt(page);
    });
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
    this.changeQuery();
  }
  changeQuery() {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: this.page }});
  }


}
