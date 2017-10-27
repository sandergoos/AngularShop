import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { IProduct }   from "../interfaces/product.interface";

@Injectable()
export class ProductService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    getProducts(): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + 'api/Product/GetProducts/40').subscribe(result => {
                    resolve(result.json() as IProduct[]);
                },
                error => reject(error)
            );
        });
    }

}