export class SearchProduct {
  name!: string;
  minPrice!: number;
  maxPrice!: number;
  negotiable!: string;
  category!: string[];

  constructor(name: string, minPrice: number, maxPrice: number, negotiable: string, category: string[]) {
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.negotiable = negotiable;
    this.category = category;
  }
}
