import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
    } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9obiIsImVtYWlsIjoiam9obi5kb2VAYmxpbmtpbmdjYXJldC5jb20iLCJuYmYiOjE1MTA3NTIxODQsImV4cCI6MTUxMDc1MjE5NCwiaXNzIjoiU2hvcCIsImF1ZCI6IlNob3BNYW5hZ2VtZW50In0.ksqrThRbfQ_TGdeUFzk2ClE32HmJ4Cwxl8XAwh2eG00`
            }
        });
        return next.handle(request);
    }
}