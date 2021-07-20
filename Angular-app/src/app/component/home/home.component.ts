import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public elements = [
    {
      title: "Event",
      description: "Descriptif de l'onglet Event",
      color: "#FB8585",
      link: "https://goToEvents.com"
    },
    {
      title: "Market",
      description: "Descriptif de l'onglet Market",
      color: "#FFB067",
      link: "productMarketplace"
    },
    {
      title: "Organisation",
      description: "Descriptif de l'onglet Organisation",
      color: "#98AFFF",
      link: "https://goToOrganisation.com"
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
