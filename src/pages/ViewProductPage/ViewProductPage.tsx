import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { Products ,Product} from "../../components/types/types";

export default function ViewProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetch<Products>("/data.json");
  const [product, setProduct] = useState<Product>();
  const [productQ, setProductQ] = useState<number>(0);
  const [addToP, setAddToP] = useState<boolean>(false);
  
  useEffect(() => {
    console.log("ID is:", id);
    console.log("DATA is:", data);
    if (data && id) {
      const numericId = parseInt(id);
      const found = getProductById(data, numericId);
      setProduct(found);
    }
  }, [id, data]);
  
  function getProductById(data: Products, id: number): Product | undefined {
    const categories = Object.keys(data) as (keyof Products)[];
    for (const category of categories) {
      const found = data[category].find(product => product.id === id);
      if (found) return found;
    }
    return undefined;
  }
  
  function handleClickAddToCart() {
    setAddToP(prev => !prev);
  }
  
  function increment() {
    setProductQ(v => v + 1);
  }
  
  function decrement() {
    setProductQ(v => Math.max(0, v - 1));
  }
  
  return (
    <div className="product-overview">
      <div className="product-img">
        <img src={product?.withBg} alt="this is an image" />
      </div>
      <div className="over-view">
        <p>{product?.description}</p>
        <h1>{product?.name}</h1>
        <div>
          <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
        </div>
        <span>0 review</span>
        <span className="price">{product?.price}</span>
        <div className="">
          <h5>{product?.category}</h5>
          <p>{product?.description}</p>
        </div>
      </div>
      
      <div className="set-price">
        <p>
          <span>price</span>    
          <span>{product?.price}</span>
        </p>
        {addToP ? (
          <div>
            <button onClick={increment}>+</button>
            <p>{productQ}</p>
            <button onClick={decrement}>-</button>
          </div>
        ) : (
          <button className="addToC" onClick={handleClickAddToCart}>add to cart</button>
        )}
      </div>
    </div>
  )
}