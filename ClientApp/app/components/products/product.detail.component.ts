import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';

@Component({
    selector: 'product-detail',
    templateUrl: 'product.detail.component.html'
})

export class ProductDetailComponent {
    product: IProduct;

    constructor() {
         this.product = {
             name: '',
             description: '',
             price: 0
         }
    }

    stringify(item: any): string {
        return JSON.stringify(item);
    }
}