import { Injectable, Inject } from '@angular/core';
import { IProduct } from "../interfaces/product.interface";
import { IFilter } from '../interfaces/filter.interface';
import 'rxjs/add/operator/toPromise';
import { IGetProductResponse } from "../interfaces/get-product-response.interface";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    private params: HttpParams;

    getProducts(filter: IFilter): Promise<IGetProductResponse> {
        this.objToSearchParams(filter);
        return this.http.get<IGetProductResponse>(`${this.baseUrl}api/Product/GetProducts/${filter.amount}/${filter.page - 1}`, { params : this.params })
            .toPromise();
    }

    createProduct(product: IProduct): Promise<boolean> {
        return this.http
            .post(this.baseUrl + "api/Product/CreateProducts", product)
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    delete(productId: number) {
        return this.http
            .delete(this.baseUrl + "api/Product/DeleteProduct/" + productId)
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private objToSearchParams(obj: any) {
        this.params = new HttpParams();

        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                this.params.set(key, obj[key]);
        }
    }

    getProduct(productId: number): Promise<IProduct> {
        return this.http.get(this.baseUrl + 'api/Product/GetProduct/' + productId)
            .toPromise()
            .then(response => response as IProduct)
            .catch(this.handleError);
    }

    updateProduct(product: IProduct): Promise<boolean> {
        return this.http
            .put(this.baseUrl + "api/Product/Update", product)
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }
}

export interface ItemsResponse {
    results: string[];
}