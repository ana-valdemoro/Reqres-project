import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  sizePerpage: number = 6;
  pageSizes: number [] = [4 , 6, 8, 12];
  page: number = 1;
  total: number = 12;
  sizeQueryParamsIsActive : boolean = false;
  ngOnInit(): void {
    this.checkForQueryParams();
    this.subscribeToUserList();
    this.getUserPerPage();
  }

  checkForQueryParams():void {
    this.route.queryParamMap.subscribe(params => {
      let page = params.get('page');
      let size = params.get('size');
      if(page !== null) this.page = parseInt(page);
      if(size !== null) {
        this.sizePerpage = parseInt(size);
        this.sizeQueryParamsIsActive = true;
      }else{
        this.sizeQueryParamsIsActive = false;
      } 
    });
  }
  getUserPerPage():void {
    this.userService.requestUserBatch(this.page.toString(), this.sizeQueryParamsIsActive ? this.sizePerpage.toString() : undefined)
      .then(res => {
        this.sizePerpage = res.per_page;
        this.page = res.page;
        this.total = res.total;
      });
  }
  subscribeToUserList():void {
    this.userSubscription = this.userService.getUsersList().subscribe(users => {
      this.users = users;
    })

  }

  requestUserRemoval(id: number):void {
    this.userService.deleteUserFromList(id);
  }
  ChangePage(nextPage: number):void {
    this.page = nextPage;
    this.getUserPerPage();
    this.changeQueryParams();
  }
  changeQueryParams() {
    if(this.sizeQueryParamsIsActive){
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: this.page, size: this.sizePerpage  }});
    }else{
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: this.page }});
    }
  }

  changePageSize(): void{
    this.page = 1;
    this.getUserPerPage();
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: this.page, size: this.sizePerpage  }});
  }
  
}
