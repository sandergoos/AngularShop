import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
    } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (typeof localStorage !== 'undefined') {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });
        }

        return next.handle(request)
            .do((event: HttpEvent<any>) => {
                // Do something with the event
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(["/login"]);
                    }
                }
            });
    }
};