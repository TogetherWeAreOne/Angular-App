import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])(?=.+[*.!@$%^&(){}[_\\]:;<>,.?/~_+\\-=|]).{8,32}$")]],
    confPassword: ["", [Validators.required]],
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

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void{
    console.log(this.registerForm.value);
    const registerFormValue = this.registerForm.value;

    this.authService.register(registerFormValue.email,registerFormValue.password,registerFormValue.firstname,
      registerFormValue.lastname,
      registerFormValue.pseudo,
      "registerFormValue.image",
      registerFormValue.role,
      registerFormValue.birthdate,
      registerFormValue.address,
      registerFormValue.zip,
      registerFormValue.country,
      registerFormValue.phone).subscribe();

  }
}
