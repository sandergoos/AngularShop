import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    constructor(private authService: AuthenticationService, private router: Router) {  }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
