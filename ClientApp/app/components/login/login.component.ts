import { Component, Inject } from '@angular/core';
import { ILoginCredentials } from "../../interfaces/login-credentials.interface";
import { DOCUMENT } from "@angular/common";
import { AuthenticationService } from "../../services/auth.service";
import { EventService } from "../../services/event.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    failed: boolean = false;
    credentials: ILoginCredentials = {};

    constructor(@Inject(DOCUMENT) private doc: any,
        private authService: AuthenticationService,
        private eventService: EventService,
        private router: Router) {
        this.setBodyBackground();
    }

    setBodyBackground() {
        if (typeof this.doc.body.style !== 'undefined') {
            this.doc.body.classList.add("login");
        }
    }

    login() {
        this.authService.login(this.credentials)
            .then(this.successResponse.bind(this))
            .catch(this.loginFailed.bind(this));
    }

    successResponse(response: any) {
        this.eventService.emit('showSuccess', 'Succesfully logged in');
        this.router.navigate(['/products']);
    }

    loginFailed() {
        this.failed = true;
        this.eventService.emit('showError', 'Login failed');
    }
}