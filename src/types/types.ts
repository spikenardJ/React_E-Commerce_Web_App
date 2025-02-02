export interface Product {
    id?: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity?: number;
    createdAt: Date;
    updatedAt: Date;
}


export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;


export type UpdateProductInput = {
    id?: string;
    title: string;
    description: string;
    price: number;
    category: string;
  };


export type CartItem = Product & { quantity: number };


export type Order = {
    id?: string;
    userId: string;
    products: Product[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
};
