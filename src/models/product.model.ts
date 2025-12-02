export type Product = {
  id: string;
  name: string;
  image: string;
  reviews: Review[];
};

export type Review = {
  rating: number;
  reviewer: string;
  comment: string;
};
