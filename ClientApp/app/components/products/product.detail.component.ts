import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from "../../services/product.service";

@Component({
    providers: [ProductService],
    selector: 'product-detail',
    templateUrl: 'product.detail.component.html'
})
export class ProductDetailComponent {

    constructor(private service: ProductService) {
        this.product = { name: '', description: '', price: 0 };
        this.price = { amount: 0, cents: 0 }
    }

    submitted: boolean = false;
    product: IProduct;
    price: IPriceInput;

    priceChanged(): void {
        this.product.price = (this.price.amount + (this.price.cents / 100)).toString();
    }

    onSubmit() {
        this.createProduct();
        this.submitted = true;
    }

    createProduct() {
        this.service.createProduct(this.product);
    }
}

interface IPriceInput {
    amount: any;
    cents: any;
}