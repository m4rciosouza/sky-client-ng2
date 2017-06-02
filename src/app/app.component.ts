/**
 * Main component class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	customerID: number;

    constructor() {
    	this.customerID = this.getCustomerID();
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
     * Set in the localStorage the customer ID.
     * Assumes values 1 for LONDON location, 
     * and 2 for LIVERPOOL location.
     *
     * @param string customerID
     */
    setCustomerID(customerID: string): void {
    	localStorage['customerID'] = customerID;
    	location.reload();
    }
}
