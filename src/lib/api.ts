// API Client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8088';

// DTOs
export interface CategoryDTO {
  categoryId: number;
  name: string;
}

export interface MetalDTO {
  metalId: number;
  metalType: string;
  metalPurity: string;
}

export interface GemDTO {
  gemId: number;
  name: string;
  price: number;
  imageFileName?: string;
  imageContentType?: string;
  imageFileSize?: number;
  imageUrl?: string;
}

export interface ProductImageDTO {
  imageId: number;
  fileName: string;
  contentType: string;
  fileSize: number;
  data?: number[];
  imageUrl: string; // This is the ready-to-use base64 data URL from backend
}

export interface ProductDTO {
  productId: number;
  name: string;
  size?: string;
  weight: number;
  hasGemstone: boolean;
  initialProductionCost: number;
  quantity: number;
  productDescription: string;
  category: CategoryDTO;
  metal: MetalDTO;
  gems: GemDTO[];
  images: ProductImageDTO[];
}

export interface ProductSearchRequest {
  searchTerm?: string;
  categoryIds?: number[];
  metalIds?: number[];
  gemIds?: number[];
  hasGemstone?: boolean;
  minWeight?: number;
  maxWeight?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class ApiClient {
  public baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Products
  async getProducts(): Promise<ProductDTO[]> {
    console.log('🔍 Fetching products from:', `${this.baseUrl}/api/products`);
    try {
      const response = await fetch(`${this.baseUrl}/api/products`);
      console.log('📡 Response status:', response.status, response.statusText);
      if (!response.ok) {
        console.error('❌ Failed to fetch products. Status:', response.status);
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('✅ Products fetched successfully:', data.length, 'products');
      return data;
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<ProductDTO> {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
  }

  async createProduct(formData: FormData): Promise<ProductDTO> {
    const response = await fetch(`${this.baseUrl}/api/products`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }

  async updateProduct(id: number, formData: FormData): Promise<ProductDTO> {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  }

  async searchProducts(searchRequest: ProductSearchRequest): Promise<PagedResponse<ProductDTO>> {
    const response = await fetch(`${this.baseUrl}/api/products/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchRequest)
    });
    if (!response.ok) throw new Error('Failed to search products');
    return response.json();
  }

  // Categories
  async getCategories(): Promise<CategoryDTO[]> {
    console.log('🔍 Fetching categories from:', `${this.baseUrl}/api/categories`);
    try {
      const response = await fetch(`${this.baseUrl}/api/categories`);
      console.log('📡 Categories response status:', response.status);
      if (!response.ok) {
        console.error('❌ Failed to fetch categories. Status:', response.status);
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Categories fetched successfully:', data.length, 'categories');
      return data;
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      throw error;
    }
  }

  async getCategory(name: string): Promise<CategoryDTO> {
    const response = await fetch(`${this.baseUrl}/api/categories/${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  }

  async createCategory(name: string): Promise<CategoryDTO> {
    const response = await fetch(`${this.baseUrl}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  }

  async updateCategory(id: number, name: string): Promise<CategoryDTO> {
    const response = await fetch(`${this.baseUrl}/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  }

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
  }

  // Metals
  async getMetals(): Promise<MetalDTO[]> {
    console.log('🔍 Fetching metals from:', `${this.baseUrl}/api/metals`);
    try {
      const response = await fetch(`${this.baseUrl}/api/metals`);
      console.log('📡 Metals response status:', response.status);
      if (!response.ok) {
        console.error('❌ Failed to fetch metals. Status:', response.status);
        throw new Error(`Failed to fetch metals: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Metals fetched successfully:', data.length, 'metals');
      return data;
    } catch (error) {
      console.error('❌ Error fetching metals:', error);
      throw error;
    }
  }

  async createMetal(metalType: string, metalPurity: string): Promise<MetalDTO> {
    const response = await fetch(`${this.baseUrl}/api/metals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metalType, metalPurity })
    });
    if (!response.ok) throw new Error('Failed to create metal');
    return response.json();
  }

  async updateMetal(id: number, metalType: string, metalPurity: string): Promise<MetalDTO> {
    const response = await fetch(`${this.baseUrl}/api/metals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metalType, metalPurity })
    });
    if (!response.ok) throw new Error('Failed to update metal');
    return response.json();
  }

  async deleteMetal(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/metals/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete metal');
  }

  // Gems
  async getGems(): Promise<GemDTO[]> {
    console.log('🔍 Fetching gems from:', `${this.baseUrl}/api/gems`);
    try {
      const response = await fetch(`${this.baseUrl}/api/gems`);
      console.log('📡 Gems response status:', response.status);
      if (!response.ok) {
        console.error('❌ Failed to fetch gems. Status:', response.status);
        throw new Error(`Failed to fetch gems: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Gems fetched successfully:', data.length, 'gems');
      return data;
    } catch (error) {
      console.error('❌ Error fetching gems:', error);
      throw error;
    }
  }

  async deleteGem(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/gems/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete gem');
  }
}

export const apiClient = new ApiClient();
