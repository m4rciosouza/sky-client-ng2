/**
 * Product service class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

	private apiBaseURL: string = 'http://localhost:4200/api/';

	/**
     * Constructor receives by injection Http module, 
     * used to request to the external API.
     *
     * @param Http http
     */
    constructor(private http: Http) { }

    /**
     * Requests to the external API for the location 
     * given a customer ID.
     *
     * @return Observable<any>
     */
    getLocation(): Observable<any> {
    	const url: string = this.apiBaseURL + 'location/' + 
    		this.getCustomerID();

    	return this.http.get(url)
          .map(response => JSON.parse(response.text()))
          .catch(error => Observable.throw(error));
    }

    /**
     * Requests to the external API for the catalogue 
     * given a customer's location ID.
     *
     * @return Observable<any>
     */
    getCatalogue(location: string): Observable<any> {
    	const url: string = this.apiBaseURL + 
    		'catalogue/' + location;

    	return this.http.get(url)
          .map(response => JSON.parse(response.text()))
          .catch(error => Observable.throw(error));
    }

    /**
     * Returns from the localStorage the customer ID.
     * Assumes values 1 for LONDON location, 
     * and 2 for LIVERPOOL location.
     *
     * @return number
     */
    getCustomerID(): number {
    	return localStorage['customerID'] || 1;
    }

    /**
     * Send a POST request to confirm the checkout.
     * Send the customer ID, ana the IDs products list 
     * separeted by ','.
     *
     * @param any basket
     * @return Observable<any>
     */
    checkout(basket: any): Observable<any> {
    	let url: string = this.apiBaseURL + 'confirmation';
    	let productsID: number[] = [];
    	for (let i in basket) {
    		productsID.push(basket[i].id);
    	}

    	url += '?customerID=' + this.getCustomerID();
    	url += '&productsID=' + productsID.join(',');

    	return this.http.post(url, {})
          .map(response => response.text())
          .catch(error => Observable.throw(error));
    }

}
