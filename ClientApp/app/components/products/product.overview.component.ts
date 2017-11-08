import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { trigger, style, animate, transition } from '@angular/animations';
import { IFilter } from '../../interfaces/filter.interface';
import { FormBuilder, FormGroup } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { IGetProductResponse } from "../../interfaces/get-product-response.interface";

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
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('200ms', style({ 'opacity': 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
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
    filterForm: FormGroup;
    filter: IFilter;
    steps: number[] = [];

    constructor(private service: ProductService, private fb: FormBuilder) {
        this.createFilterForm();
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    createFilterForm(): void {
        this.filterForm = this.fb.group({
            name: '',
            priceFrom: null,
            priceTill: null
        });

        this.filterForm
            .valueChanges
            .debounceTime(1000)
            .subscribe(this.formChanged.bind(this));
    }

    updateStep(step: number): void {
        this.step = step;
        this.products = [];
        this.loadProducts();
    }

    loadProducts(): void {
        this.isLoading = true;
        this.service.getProducts(this.step, this.filter)
            .then(this.processLoadingResponse.bind(this))
            .catch(this.catch.bind(this));
    }

    processLoadingResponse(response: IGetProductResponse): void {
        this.addProducts(response.products);

        let amountOfSteps = Math.ceil(response.count / 40);

        this.steps = [];
        for (let i = 0; i < amountOfSteps; i++) {
            this.steps.push(i);
        }
    }

    catch(exception: any): void {
        console.error(exception);
        this.isLoading = false;
    }

    addProducts(products: IProduct[]): void {
        this.products = this.products.concat(products);
        this.isLoading = false;
    }

    getDateString(dateString: string): string {
        var date = new Date(dateString);
        return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
    }

    remove(id: number) {
        this.service.delete(id)
            .then(this.reloadProducts.bind(this))
            .catch(this.catch);
    }

    reloadProducts(): void {
        this.products = [];
        this.step = 0;
        this.loadProducts();
    }

    formChanged(form: IFilter): void {
        this.filter = form;
        this.reloadProducts();
    }
}