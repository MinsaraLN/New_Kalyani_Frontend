import { ProductDTO, PagedResponse } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSearchResultsProps {
  results: PagedResponse<ProductDTO> | null;
  loading: boolean;
  onPageChange: (page: number) => void;
}

const ProductSearchResults = ({ results, loading, onPageChange }: ProductSearchResultsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-300"></div>
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!results || results.content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {results.content.length} of {results.totalElements} products
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(results.page - 1)}
            disabled={!results.hasPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {results.page + 1} of {results.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(results.page + 1)}
            disabled={!results.hasNext}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.content.map((product) => {
          const imageSrc = product.images && product.images.length > 0 
            ? product.images[0].imageUrl 
            : "/placeholder.svg";
          
          return (
            <Card key={product.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{product.category?.name} • {product.metal?.metalType} {product.metal?.metalPurity}</p>
                  <p>Weight: {product.weight}g</p>
                  {product.hasGemstone && (
                    <p className="text-emerald-600 font-medium">With Gemstones</p>
                  )}
                </div>
                <Button className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSearchResults;
