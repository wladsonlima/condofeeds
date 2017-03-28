import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Login } from '../interface/login';
import { TokenCondominio } from '../interface/tokenCondominio';
import { GetOrders } from '../interface/orders/getOrders';


/*
 Generated class for the Webservice provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WebService {

    private url: string = 'https://www.condofeeds.com.br/condofeeds/restserver/';
    private version: string = '01/';


    private headers = new Headers(
        {
            'Accept': 'application/json',
            'Authorization': 'Basic YXBpOkt6clRNU0QkOTAwTnUxamhRNE0heU9tdzM0MmZZRDYjJkhXbWwkVU1INjEqeXlEMzFkRjRlUCFtdG0xMVdsRE8='
        }
    );

    constructor(public http: Http) {
        console.log('Hello Webservice Provider');
    }

    getLogin(login: Login) {
        return this.http.post(this.url + this.version + 'auth/authentication', login, { headers: this.headers }).toPromise().then(res => res.json());
    }

    getFeeds(tokenCondominio: TokenCondominio) {
        return this.http.post(this.url + this.version + 'Feed', tokenCondominio, { headers: this.headers }).toPromise().then(res => res.json());
    }

    getOrders(getOrders: GetOrders) {
        return this.http.post(this.url + this.version + 'orders', getOrders, { headers: this.headers }).toPromise().then(res => res.json());
    }



}