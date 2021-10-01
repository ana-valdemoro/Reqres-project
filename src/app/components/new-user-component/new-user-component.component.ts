import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-new-user-component',
  templateUrl: './new-user-component.component.html',
  styleUrls: ['./new-user-component.component.scss']
})
export class NewUserComponentComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  onCreateUser() {
    let name: string = this.userForm.get('name')?.value;
    let lastName: string = this.userForm.get('lastName')?.value;
    let email: string = this.userForm.get('email')?.value;
    if (this.userForm.valid) {
      let user = {
        first_name: name,
        last_name: lastName,
        email: email,
      };
      this.userService.createUser(user);
    }
  }
}
