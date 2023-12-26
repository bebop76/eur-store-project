export type ProductsEntity = {
  id: string;
  data: {
    reviews: string[];
    price: number;
    description?: string;
    title: string;
    category: string;
    employee?: string;
  };
};
