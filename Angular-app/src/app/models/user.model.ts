export class User {
  id?: string;
  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  pseudo?: string;
  image?: string;
  role?: string;
  birthdate?: string;
  address?: string;
  zip?: string;
  city?: string;
  phone?: string;
  certified?: boolean;
  longitude?: number;
  latitude?: number;


  constructor( email: string, password: string, firstname: string, lastname: string, pseudo: string, image: string, role: string, birthdate: string, address: string, zip: string, city: string, phone: string, certified: boolean, longitude: number, latitude: number) {
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
    this.city = city;
    this.phone = phone;
    this.certified = certified;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
