import { Product, Review } from "./product.model";

export interface ProductConxtextState {
  loading: boolean;
  error: string | null;
  products: Product[];
}

export interface ProductConxtextActions {
  clearError: () => void;
  getProducts: () => Promise<void>;
  handleSubmitReview: (id: string, values: Review) => Promise<void>;
}

export interface ProductContextType
  extends ProductConxtextState,
    ProductConxtextActions {}
