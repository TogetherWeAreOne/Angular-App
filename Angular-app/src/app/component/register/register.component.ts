import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
    firstname: ["", [Validators.required]],
    lastname: ["", [Validators.required]],
    pseudo: ["", [Validators.required]],
    role: ["", [Validators.required]],
    birthdate: ["", [Validators.required]],
    address: ["", [Validators.required]],
    zip: ["", [Validators.required]],
    country: ["", [Validators.required]],
    phone: ["", [Validators.required]]
  })

  constructor(private authService : AuthService, private fb : FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.registerForm.value);
    const authformValue = this.registerForm.value;
    this.authService.login(authformValue.email,authformValue.password);
  }
}
