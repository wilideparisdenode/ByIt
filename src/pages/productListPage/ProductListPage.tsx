// import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import type { Product, Products } from "../../components/types/types";
 import { useFetch } from "../../hooks/useFetch";

import "./ProductListPage.css" 
type ProductCategory = keyof Products;
export default function ProductListPage() {
   const { data, isPending, error}=useFetch<Products>("./data.json");

//    function handleClick(){

//    }

    if (isPending) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!data) return <div className="no-data">No products available</div>;
    const categories = Object.keys(data) as ProductCategory[];

    return (
        <div className="product-list-container">
            {categories.map((category) => (
                <section key={category} className="product-category">
                    <h2 className="category-title">{category}</h2>
                    <div className="products-grid" >
                      
                        {data[category].map((item: Product) => (
                            <div className="product-card" key={item.id}>
                                <img 
                                    src={item.withBg} 
                                    alt={item.name} 
                                    className="product-image" 
                                />
                                <div className="product-info">
                                    <h4 className="product-name">{item.name}</h4>
                                    <p className="product-description">{item.description}</p>
                                    <p className="product-price">${item.price.toFixed(2)}</p>
                                    <button className="buy-button"><Link to={"/product-overview/"+item.id}> Add to Cart</Link>  </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}