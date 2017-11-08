import { IProduct } from "./product.interface";

export interface IGetProductResponse {
    products: IProduct[];
    count: number;
}