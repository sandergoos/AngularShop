﻿import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
    templateUrl: './product.overview.component.html',
    styleUrls: ['./product.overview.component.css'],
    selector: 'product-overview',
    providers: [ProductService],
    animations: [
        trigger(
            'fade',
            [
                transition(
                    ':enter', [
                        style({  opacity: 0 }),
                        animate('200ms', style({ 'opacity': 1 }))
                    ]
                ),
                transition(
                    ':leave', [
                        style({ 'opacity': 1 }),
                        animate('200ms', style({ 'opacity': 0 }))
                    ]
                )
            ]
        )
    ]
})

export class ProductOverviewComponent implements OnInit {
    isLoading: boolean = true;
    products: IProduct[] = [];
    step: number = 0;

    constructor(private service: ProductService) { }

    ngOnInit(): void {
        window.onscroll = this.windowScrolled.bind(this);
        this.loadProducts();
    }

    windowScrolled(): void {
        if (this.isLoading) return;

        if (this.isEndOfPageReached()) {
            this.step += 1;
            this.loadProducts();
        }
    }

    isEndOfPageReached() {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20;
    }

    loadProducts(): void {
        this.isLoading = true;
        this.service.getProducts(this.step).then(this.addProducts.bind(this)).catch(this.catch);
    }

    catch(exception: any): void {
        console.error(exception);
        this.isLoading = false;
    }

    addProducts(products: IProduct[]): void {
        this.products = this.products.concat(products);
        this.isLoading = false;
    }
}