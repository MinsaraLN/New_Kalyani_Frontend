import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSearchRequest, PagedResponse, ProductDTO, apiClient } from "@/lib/api";
import { Search, Filter, X } from "lucide-react";

interface ProductSearchProps {
  onSearchResults: (results: PagedResponse<ProductDTO>) => void;
  onLoading: (loading: boolean) => void;
}

const ProductSearch = ({ onSearchResults, onLoading }: ProductSearchProps) => {
  const [searchRequest, setSearchRequest] = useState<ProductSearchRequest>({
    page: 0,
    pageSize: 20,
    sortBy: "name",
    sortDirection: "asc"
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async () => {
    try {
      onLoading(true);
      const results = await apiClient.searchProducts(searchRequest);
      onSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      onLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchRequest({
      page: 0,
      pageSize: 20,
      sortBy: "name",
      sortDirection: "asc"
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by product name..."
            value={searchRequest.searchTerm || ""}
            onChange={(e) => setSearchRequest(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="px-6">
            Search
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select
                value={searchRequest.sortBy || "name"}
                onValueChange={(value) => setSearchRequest(prev => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="created_date">Date Created</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort Direction</label>
              <Select
                value={searchRequest.sortDirection || "asc"}
                onValueChange={(value) => setSearchRequest(prev => ({ 
                  ...prev, 
                  sortDirection: value as "asc" | "desc" 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Has Gemstone</label>
              <Select
                value={searchRequest.hasGemstone?.toString() || ""}
                onValueChange={(value) => setSearchRequest(prev => ({ 
                  ...prev, 
                  hasGemstone: value === "" ? undefined : value === "true"
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="true">With Gemstones</SelectItem>
                  <SelectItem value="false">Without Gemstones</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSearch;
