import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  connectionError: boolean = false;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.isConnected()) {
      this.router.navigate(["/home"]);
    }
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    const authformValue = this.loginForm.value;

    this.authService.login(authformValue.email, authformValue.password)
      .subscribe(() => {
        },
        error => {
          if (error.status === 401) {
            this.connectionError = true;
          }
        }, () => {
          this.router.navigate(['/home']);
        }
      );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      },
      error => {
        if (error.status === 401) {
          this.connectionError = true;
        }
      }, () => {
        this.router.navigate(['/auth']);
      });
  }


}
