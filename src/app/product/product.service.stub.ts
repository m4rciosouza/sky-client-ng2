/**
 * Product service stub class.
 * This class is used as a stub for test the product 
 * component class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class ProductServiceStub {

    constructor() {}

    getLocation(): Observable<any> {
    	return Observable.of('123');
    }

    getCatalogue(location: string): Observable<any> {
    	return Observable.of('123');
    }

    getCustomerID(): number {
    	return 1;
    }

    checkout(basket: any): Observable<any> {
    	return Observable.of('123');
    }

}
