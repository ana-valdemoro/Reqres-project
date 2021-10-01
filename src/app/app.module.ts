import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';
import { NewUserComponentComponent } from './components/new-user-component/new-user-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponentComponent,
    NewUserComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
