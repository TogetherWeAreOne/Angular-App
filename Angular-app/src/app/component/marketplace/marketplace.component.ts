import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  public items = [
    {
      name: "Manette de jeu",
      price: 13 + "€",
      category: "Catégorie",
      cityAndPostalCode: 75001 + " " + "Paris 1er Arrondissement",
      imageLink: "/assets/controller-image.jpg"
    },
    {
      name: "Bouteille",
      price: 15 + "€",
      category: "Catégorie",
      cityAndPostalCode: 75001 + " " +  "Paris 1er Arrondissement",
      imageLink: "/assets/bottle.jpg"
    },
    {
      name: "Stylo",
      price: 30 + "€",
      category: "Catégorie",
      cityAndPostalCode: 75001 + " " +  "Paris 1er Arrondissement",
      imageLink: "/assets/pen.jpg"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
