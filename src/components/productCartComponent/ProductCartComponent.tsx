import "./productCart.css";
import type { Product,Products } from "../types/types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Autoplay } from 'swiper/modules';


// SAFE DEFAULT VALUES
const EMPTY_PRODUCT: Product = {
  id: -1,
  name: '',
  withBg: '',
  description:'',
  price:0,
  category:''

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

function ProductListSummary() {
  return (
    <div className="product-list-summary">
      <h2>Computer Parts</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        navigation={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[
  '/img/c8.jpeg',
  '/img/ch3.jpeg',
  '/img/m2.jpeg',
  '/img/N1.jpeg',
  '/img/p5.jpeg',
  '/img/r7.jpeg',].map((src, index) => (
          <SwiperSlide key={index}>
            <div className="slide-card">
              <img src={src} alt={`Product ${index}`} className="slide-img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
      <ProductListSummary/>
    </div>
  );
}