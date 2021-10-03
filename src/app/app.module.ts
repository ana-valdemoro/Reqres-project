import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';
import { NewUserComponentComponent } from './components/new-user-component/new-user-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponentComponent,
    NewUserComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NgxPaginationModule]
})
export class AppModule { }
