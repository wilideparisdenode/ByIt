import "./productCart.css";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  withBg: string;
}

interface Products {
  watches: Product[];
  phones: Product[];
  screens: Product[];
  chargers: Product[];
  mice: Product[];
  laptops: Product[];
}

// SAFE DEFAULT VALUES
const EMPTY_PRODUCT: Product = {
  id: -1,
  name: '',
  withBg: ''
};

const EMPTY_PRODUCTS: Products = {
  watches: [],
  phones: [],
  screens: [],
  chargers: [],
  mice: [],
  laptops: []
};

function ProductCartTwo({ product = EMPTY_PRODUCT }: { product?: Product }) {
  if (!product.withBg) return null; // Don't render if no image
  
  return (
    <div className="card">
      <h2>Build Your super computer</h2>
      <img src={product.withBg} alt={product.name} />
      <a href="http://" className="link" target="_blank" rel="noopener noreferrer">{product.name}</a> 
    </div>
  );
}

function ProductCartOne({ 
  product = EMPTY_PRODUCTS, 
  index = 0 
}: { 
  product?: Products, 
  index?: number 
}) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) {
      setItems([]);
      return;
    }

    const safeItems = [
      product.laptops?.[index] ?? null,
      product.watches?.[index] ?? null,
      product.phones?.[index] ?? null,
      product.mice?.[index] ?? null
    ].filter((item): item is Product => item !== null);

    setItems(safeItems);
  }, [product, index]);

  if (items.length === 0) return null;

  return (
    <div className="card1">
      <h2>Build Your super computer</h2>
      <section>
        {items.map((e) => (
          <div key={e.id}>
            <img src={e.withBg} alt={e.name} />
            <p>{e.name}</p>
          </div>
        ))}
      </section>
      <a href="_blank">shop now</a>
    </div>
  );
}

function ProductListSumarry() {
  return (
    <div className="ProductListSummary">
      <h2>Product List overview</h2>
      <div><img src="/img/c8.jpeg" alt="" /><img src="/img/ch3.jpeg" alt="" /><img src="/img/m2.jpeg" alt="" /><img src="/img/N1.jpeg" alt="" /><img src="/img/p5.jpeg" alt="" /><img src="/img/r7.jpeg" alt="" /></div>
    </div>
  )
}


export default function ProductCartComponent() {
  const [products, setProducts] = useState<Products>(EMPTY_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        // ENSURE ALL ARRAYS EXIST
        const safeData: Products = {
          watches: data.watches || [],
          phones: data.phones || [],
          screens: data.screens || [],
          chargers: data.chargers || [],
          mice: data.mice || [],
          laptops: data.laptops || []
        };
        
        setProducts(safeData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  // SAFE RENDER HELPER
  const renderIfValid = (category: keyof Products, index: number) => {
    const item = products[category]?.[index];
    return item?.withBg ? <ProductCartTwo product={item} /> : null;
  };

  return (
    <div className="ProductCart">
      <ProductCartOne product={products} index={1} />
      {renderIfValid('laptops', 4)}
      <ProductCartOne product={products} index={2} />
      {renderIfValid('chargers', 3)}
      <ProductCartOne product={products} index={3} />
      {renderIfValid('screens', 1)}
      <ProductListSumarry/>
    </div>
  );
}