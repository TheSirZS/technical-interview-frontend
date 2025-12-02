import React, { useState, ReactNode, useContext, createContext } from "react";

import {
  ProductContextType,
  ProductConxtextState,
} from "../models/context.model";
import { Product, Review } from "../models/product.model";
import {
  createNewReviewService,
  getProductsService,
} from "../services/product-service";
import { AxiosError } from "axios";

interface ProductProviderProps {
  children: ReactNode;
}

const initialState: ProductConxtextState = {
  error: null,
  loading: false,
  products: [],
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<ProductConxtextState>(initialState);

  const setError = (error: string | null): void => {
    setState((prev) => ({ ...prev, error }));
  };

  const setLoading = (loading: boolean): void => {
    setState((prev) => ({ ...prev, loading }));
  };

  const setProducts = (products: Product[]): void => {
    setState((prev) => ({ ...prev, products }));
  };

  const clearError = () => setState((prev) => ({ ...prev, error: null }));

  const handleSubmitReview = async (
    id: string,
    values: Review
  ): Promise<void> => {
    try {
      const data = await createNewReviewService(id, values);
      setProducts(data.products);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
    }
  };

  const getProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getProductsService();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
      setLoading(false);
    }
  };

  const value: ProductContextType = {
    error: state.error,
    loading: state.loading,
    products: state.products,
    clearError: clearError,
    getProducts: getProducts,
    handleSubmitReview: handleSubmitReview,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used inside Component");
  return ctx;
};
