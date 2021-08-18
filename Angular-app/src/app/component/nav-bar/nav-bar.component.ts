import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  register: boolean = false;
  auth: boolean = true;
  login: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    if(this.authService.getConnectedUserId() !== ""){
      this.login = true
    }
  }

  ngOnInit(): void {
    this.isStringUrlName("register");
  }

  setUpVariables(): void{

  }

  goToRegister(): void {
    this.register = true;
    this.auth = false;
    this.router.navigateByUrl('/register');
  }

  goToAuth(): void {
    this.register = false;
    this.auth = true;
    this.router.navigateByUrl('/auth');
  }

  isStringUrlName(name: string): void{
    let url = window.location.href;
    let urlName = url.slice(-name.length, url.length)
    //alert (urlName);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      },
      error => {

      }, () => {
        this.login = false;
        this.router.navigate(['/']);
      });
  }

  btnClick () : void {
    this.router.navigateByUrl('/message');
  };
}
