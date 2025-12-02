import { Product } from "./product.model";

export type GetAPIResponse = {
  products: Product[];
};

export type PostAPIResponse = {
  message: string;
  products: Product[];
};
