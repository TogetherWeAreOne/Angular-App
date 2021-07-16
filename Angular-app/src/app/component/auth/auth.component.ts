import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })

  constructor(private authService : AuthService, private fb : FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.loginForm.value);
    const authformValue = this.loginForm.value;
    this.authService.login(authformValue.email,authformValue.password);
  }




}
