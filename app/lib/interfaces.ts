export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    originalprice: number;
    quantity: number;
    imageString: string;
    size:string;
    color:string;
  }>;
};

export type Wishlist = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    originalprice: number;
    imageString: string;
    size:string;
    color:string;
  }>;
};
