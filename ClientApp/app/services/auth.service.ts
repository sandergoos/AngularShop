import { Injectable, Inject } from "@angular/core";
import { ILoginCredentials } from '../interfaces/login-credentials.interface';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {  }

    login(credentials: ILoginCredentials): Promise<any> {
        return this.http
            .post(this.baseUrl + "api/Login/Authenticate", credentials)
            .toPromise()
            .then(this.loginSuccessful.bind(this));
    }

    handleError(response: any) {
        // Error handling
    }

    loginSuccessful(response: any): void {
        localStorage.setItem('token', response.result);
    }

    logout(): any {
        localStorage.removeItem('token');
    }
}