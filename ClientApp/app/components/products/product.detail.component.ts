import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from "../../services/event.service";

@Component({
    providers: [ProductService],
    selector: 'product-detail',
    templateUrl: 'product.detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    sub: any;
    submitted: boolean = false;
    product: IProduct;
    price: IPriceInput;
    productId: number;

    constructor(private service: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService) {
        this.product = { name: '', description: '', price: 0 };
        this.price = { amount: 0, cents: 0 };
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.productId = +params['id'];
            if (this.productId) {
                this.getProduct();
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    priceChanged(): void {
        this.product.price = (this.price.amount + (this.price.cents / 100)).toString();
    }

    getProduct(): void {
        this.service.getProduct(this.productId).then((response: IProduct) => {
            this.product = response;
            this.price.amount = Math.floor(this.product.price);
            this.price.cents = Math.floor((this.product.price - this.price.amount) * 100);
        });
    }

    onSubmit() {
        if (this.productId) {
            this.updateProduct();
        } else {
            this.createProduct();
        }

        this.submitted = true;
    }

    createProduct() {
        this.service.createProduct(this.product).then(this.success.bind(this));
    }

    updateProduct(): void {
        this.service.updateProduct(this.product).then(this.success.bind(this));
    }

    success(): void {
        this.router.navigateByUrl('/products');
        this.eventService.emit("showSuccess", "Product successfully created!");
    }
}

interface IPriceInput {
    amount: any;
    cents: any;
}