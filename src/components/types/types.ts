
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
    image_url?: string;
    description:string;
    category?:category;
    price:number;
    quantity?:number;
    stock?:number;
    reviewCount?:number;
    withBg?:string;
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
  full_name?:string,
  email?:string,
  password?:string,
  phone_number?:string,
  address?:string,

}
export interface  category{
  name?:string;
}