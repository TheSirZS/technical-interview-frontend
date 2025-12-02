import { AxiosRequestConfig } from "axios";

import { instanceDB } from "../api/api-config";

import { Review } from "../models/product.model";
import { GetAPIResponse, PostAPIResponse } from "../models/api.model";

export const getProductsService = async (
  params?: AxiosRequestConfig
): Promise<GetAPIResponse> => {
  const { data } = await instanceDB().get<GetAPIResponse>("/products", {
    params,
  });
  return data;
};

export const createNewReviewService = async (
  id: string,
  values: Review
): Promise<GetAPIResponse> => {
  const { data } = await instanceDB().post<PostAPIResponse>(
    `/products/${id}/reviews`,
    values
  );
  return data;
};
