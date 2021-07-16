export class User{
  email : string;
  password? : string;
  firstname? : string;
  lastname? : string;
  pseudo? : string;
  image? : string;
  role? : string;
  birthdate? : string;
  address? : string;
  zip? : string;
  country? : string;
  phone? : string;
  certified? : boolean;


  constructor(email: string, password: string, firstname: string, lastname: string, pseudo: string, image: string, role: string, birthdate: string, address: string, zip: string, country: string, phone: string, certified: boolean) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.pseudo = pseudo;
    this.image = image;
    this.role = role;
    this.birthdate = birthdate;
    this.address = address;
    this.zip = zip;
    this.country = country;
    this.phone = phone;
    this.certified = certified;
  }
}
