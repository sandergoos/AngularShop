import { Injectable, Inject } from '@angular/core';
import { IProduct } from "../interfaces/product.interface";
import { IFilter } from '../interfaces/filter.interface';
import 'rxjs/add/operator/toPromise';
import { URLSearchParams, Http } from '@angular/http';
import { IGetProductResponse } from "../interfaces/get-product-response.interface";

@Injectable()
export class ProductService {
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    private params: URLSearchParams;

    getProducts(step: number, filter: IFilter): Promise<IGetProductResponse> {
        this.objToSearchParams(filter);
        return this.http.get(this.baseUrl + 'api/Product/GetProducts/40/' + step,
            {
                params: this.params
            })
            .toPromise()
            .then(response => response.json() as IGetProductResponse)
            .catch(this.handleError);
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
        this.params = new URLSearchParams();

        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                this.params.set(key, obj[key]);
        }
    }

    getProduct(productId: number): Promise<IProduct> {
        return this.http.get(this.baseUrl + 'api/Product/GetProduct/' + productId)
            .toPromise()
            .then(response => response.json() as IProduct)
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