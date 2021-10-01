import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponentComponent } from './components/new-user-component/new-user-component.component';
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';

const routes: Routes = [
  {path: "", redirectTo: "users", pathMatch: 'full' },
  {path: "users", component: UserListComponentComponent},
  {path: "newUser", component: NewUserComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
