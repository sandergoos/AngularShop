import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IProduct }   from "../interfaces/product.interface";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    getProducts(step: number): Promise<IProduct[]> {
        return this.http.get(this.baseUrl + 'api/Product/GetProducts/40/' + step)
            .toPromise()
            .then(response => response.json() as IProduct[])
            .catch(this.handleError);
    }

    createProduct(product: IProduct): Promise<boolean> {
        return this.http
            .post(this.baseUrl + "api/Product/CreateProducts", product)
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}