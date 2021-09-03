import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AddressApiService} from "../../services/addressApi.service";
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
    city: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    longitude : ["", []],
    latitude: ["", []]
  })
  adresseFromApi: any;
  myControl = new FormControl();
  options: any[] = [];
  addressSearchTimeOut!: number;


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router : Router,
              private addressApiService: AddressApiService) {
  }

  ngOnInit(): void {
    /*this.filteredAdresses = this.registerForm.value.address.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/


  }

  public setAddress(address : any) : void {
    this.registerForm.controls['address'].setValue(address?.properties?.label);
    this.registerForm.controls['zip'].setValue(address.properties.postcode);
    this.registerForm.controls['city'].setValue(address.properties.city);
    this.registerForm.controls['longitude'].setValue(address.geometry.coordinates[0]);
    this.registerForm.controls['latitude'].setValue(address.geometry.coordinates[1]);
  }

  public filter($event: any): void {
    clearTimeout(this.addressSearchTimeOut);
    this.addressSearchTimeOut = setTimeout(() => {
      if ($event.target.value === undefined || $event.target.value === '') {
        this.options = [];
        return;
      }
      this.addressApiService.getAddress($event.target.value).subscribe(
        address => this.options = address.features
      )}, 500);
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confPassword() {
    return this.registerForm.get('confPassword');
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    const registerFormValue = this.registerForm.value;

    this.authService.register(this.registerForm.value).subscribe(
      () => {},
      () => alert("une erreur est survenue ! "),
      () => this.router.navigate(['/message']),
    );
  }
}
