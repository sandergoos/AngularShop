import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ProductOverviewComponent } from "./components/products/product.overview.component";
import { ProductDetailComponent } from "./components/products/product.detail.component";
import { NotificationComponent } from "./components/shared/notification.component";
import { EventService } from "./services/event.service";
import { TokenInterceptor } from "./auth/token.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProductOverviewComponent,
        ProductDetailComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductOverviewComponent },
            { path: 'products/create', component: ProductDetailComponent },
            { path: 'products/edit/:id', component: ProductDetailComponent },
        ])
    ],
    providers: [
        EventService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class AppModuleShared {
}
