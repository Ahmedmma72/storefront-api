export type order = {
  id?: number;
  user_id?: number;
  status?: string;
};

export type order_product = {
  order_id?: number;
  product_id?: number;
  quantity?: number;
};

export type userOrder = {
  order_id: number;
  status: string;
  quantity: number[];
  product_name: string[];
};
