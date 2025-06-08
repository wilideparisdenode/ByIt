
// SAFE DEFAULT VALUES


  export interface Products  {
    watches: Product[],
    phones:  Product[],
    screens:  Product[],
    chargers:  Product[],
    mice:  Product[],
    laptops:  Product[]
  };

  export interface Product {
    id: number;
    name: string;
    withBg: string;
    description:string;
    price:number;
  }

