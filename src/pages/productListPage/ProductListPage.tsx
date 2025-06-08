import { useEffect, useState } from "react"
import type { Product, Products } from "../../components/types/types"
import "./ProductListPage.css" 
type ProductCategory = keyof Products;
export default function ProductListPage() {
    const [data, setData] = useState<Products | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("./data.json");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const d = await res.json();
                setData(d);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
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
                                    <button className="buy-button">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}