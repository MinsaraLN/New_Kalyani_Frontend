import { useState, useEffect } from "react";
import { ProductDTO, apiClient } from "@/lib/api";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

// Fallback images for when products don't have images
const fallbackImages = [product1, product2, product3, product4, product5, product6, product7, product8];

// ========================================
// 🎯 BEST SELLING PRODUCTS CONFIGURATION
// ========================================
// Add or modify the product IDs you want to display in the best selling section
// These will be fetched from the backend and displayed in the sliding carousel
const BEST_SELLING_PRODUCT_IDS = [
  7, 8, 9, 10// Your "Elegant Ring" product
  // Add more product IDs here as you create more products
  // Example: 2, 3, 4, 5, 6
];
// ========================================

const ProductGrid = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await apiClient.getProducts();
        
        // Filter only the products with IDs in BEST_SELLING_PRODUCT_IDS
        const selectedProducts = allProducts.filter(product => 
          BEST_SELLING_PRODUCT_IDS.includes(product.productId)
        );
        
        // If we have fewer products than needed, duplicate them for smooth carousel
        const duplicatedProducts = [];
        const targetCount = Math.max(8, selectedProducts.length * 2); // At least 8 items for smooth carousel
        
        for (let i = 0; i < targetCount; i++) {
          const product = selectedProducts[i % selectedProducts.length];
          if (product) {
            // Create a deep copy to avoid mutating the original product
            const productCopy = JSON.parse(JSON.stringify(product));
            productCopy.productId = `${product.productId}-${i}`; // Make IDs unique for React keys
            duplicatedProducts.push(productCopy);
          }
        }
        
        // console.log('Best selling products loaded:', duplicatedProducts);
        setBestSellingProducts(duplicatedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Best Selling Pieces
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Loading our most cherished designs...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-80 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || bestSellingProducts.length === 0) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Best Selling Pieces
          </h2>
          <p className="text-lg text-red-500 font-body">
            {error || "No best selling products found. Please add product IDs to BEST_SELLING_PRODUCT_IDS in ProductGrid.tsx"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Best Selling Pieces
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Discover our most cherished designs, loved by jewelry connoisseurs worldwide
          </p>
        </div>

        {/* Sliding Carousel Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex space-x-8 animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
              width: `${bestSellingProducts.length * 320}px` // Adjust based on card width + gap
            }}
          >
            {bestSellingProducts.map((product, index) => {
              // Use product image if available, otherwise use fallback
              let imageSrc = fallbackImages[index % fallbackImages.length];
              
              if (product.images && product.images.length > 0) {
                // Use the imageUrl field that's already base64 encoded from backend
                if (product.images[0].imageUrl) {
                  imageSrc = product.images[0].imageUrl;
                }
              }
              
              return (
                <div
                  key={product.productId}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: '300px' }}
                >
                  <div className="relative overflow-hidden rounded-lg bg-card card-shadow hover:hover-shadow transition-elegant mb-4">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-elegant"
                    />
                    {product.hasGemstone && (
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Gemstone
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-elegant">
                      <button className="bg-card p-3 rounded-full card-shadow hover:elegant-shadow transition-smooth">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-primary mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {product.category?.name} • {product.metal?.metalType} {product.metal?.metalPurity}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    Weight: {product.weight}g
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
