import { Link, useLocation } from "react-router-dom";
import type { Product } from "../../components/types/types";
import { useFetch } from "../../hooks/useFetch.ts";
import "./ProductListPage.css";

export default function ProductListPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const { data, isPending, error } = useFetch<Product[]>(
    `http://localhost:9000/api/products?${searchParams.toString()}`
  );

  if (isPending) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data?.length) return <div className="no-data">No products found matching your criteria</div>;

  return (
    <div className="product-list-container">
      <div className="products-grid">
        {data.map((item: Product) => (
          <div className="product-card" key={item.id}>
            <img
              src={item.image_url}
              alt={item.name}
              className="product-image"
            />
            <div className="product-info">
              <h4 className="product-name">{item.name}</h4>
              <p className="product-category">{item.category?.name}</p>
              <p className="product-description">{item.description}</p>
              <p className="product-price">${item.price}</p>
              <button className="buy-button">
                <Link to={`/product-overview/${item.id}`}>View Product</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}