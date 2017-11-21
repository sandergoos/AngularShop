import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { IFilter } from '../../interfaces/filter.interface';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IGetProductResponse } from "../../interfaces/get-product-response.interface";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { EventService } from "../../services/event.service";
import { fade } from '../../animations';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
    templateUrl: './product.overview.component.html',
    styleUrls: ['./product.overview.component.css'],
    selector: 'product-overview',
    providers: [ProductService],
    animations: [fade]
})
export class ProductOverviewComponent implements OnInit {
    products: IProduct[] = [];
    filterForm: FormGroup;
    filter: IFilter;
    steps: number[] = [];

    constructor( @Inject(DOCUMENT) private doc: any,
        private service: ProductService,
        private fb: FormBuilder,
        private eventService: EventService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.createFilterForm(params);
        });

        if (typeof this.doc.body.style !== 'undefined') {
            this.doc.body.classList.remove("login");
        }
    }

    createFilterForm(params: Params): void {
        this.products = [];

        this.filter = {
            name: '',
            priceFrom: 0,
            priceTill: 0,
            orderBy: 'id',
            desc: false,
            amount: 20,
            page: 1
        };

        var anyFilter = this.filter as any;

        for (let property in params) {
            if (params.hasOwnProperty(property)) {
                anyFilter[property] = params[property];
            }
        }

        this.filterForm = this.fb.group(this.filter);

        this.filterForm
            .valueChanges
            .debounceTime(1000)
            .subscribe(this.formChanged.bind(this));

        this.loadProducts();
    }

    updateStep(step: number): void {
        this.filter.page = step;
        this.router.navigate(['/products'], { queryParams: this.filter });
    }

    resetFilter() {
        this.router.navigate(['/products']);
    }

    loadProducts(): void {
        this.loadingStart();
        this.service.getProducts(this.filter)
            .then(this.processLoadingResponse.bind(this))
            .catch(this.catch.bind(this));
    }

    processLoadingResponse(response: IGetProductResponse): void {
        this.addProducts(response.products);

        const amountOfSteps = Math.ceil(response.count / this.filterForm.value.amount);

        this.steps = [];
        for (let i = 0; i < amountOfSteps; i++) {
            this.steps.push(i);
        }
    }

    catch(exception: any): void {
        console.error(exception);
        this.loadingStop();
    }

    addProducts(products: IProduct[]): void {
        this.products = this.products.concat(products);
        this.loadingStop();
    }

    getDateString(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
    }

    remove(id: number) {
        this.service.delete(id)
            .then(() => {
                this.reloadProducts();
                this.eventService.emit("showSuccess", "Product succesfully deleted.");
            })
            .catch(this.catch);
    }

    reloadProducts(): void {
        this.router.navigate(['/products', { queryParams: this.filter }]);
    }

    formChanged(form: IFilter): void {
        this.filter = form;
        this.router.navigate(['/products'], { queryParams: this.filter });
    }

    changeOrder(orderParam: string) {
        if (this.filterForm.value.orderBy === orderParam) {
            this.filterForm.value.desc = !(this.filterForm.value.desc === "true");
        } else {
            this.filterForm.value.desc = false;
        }

        this.filterForm.value.orderBy = orderParam;
        this.formChanged(this.filterForm.value);
    }

    showOrder(param: string, desc: boolean): boolean {
        return this.filterForm.value.orderBy === param && (this.filterForm.value.desc === 'true') === desc;
    }

    loadingStart() {
        this.eventService.emit("loading", "Fetching products...");
    }

    loadingStop(): void {
        this.eventService.emit("stopLoading", null);
    }
}