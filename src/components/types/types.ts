
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
    category:string;
    price:number;
  }

export type Option={
  method:string,
  headers: Record<string, string>,
    body:string
}
export type Data={
  data:{}
}

export type FormData={
  name?:string,
  userName?:string,
  email?:string,
  password?:string

}