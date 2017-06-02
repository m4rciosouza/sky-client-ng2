/**
 * Product component class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
        
  categories: string[];
  catalogue: any = {};
  basket: any = [];
  hasError: boolean = false;
  showConfirmation: boolean = false;

  /**
   * Constructor receives by injection a ProductService, 
   * used to populate the catalogue, and fetch the location.
   *
   * @param ProductService productService
   */
  constructor(private productService: ProductService) { }

  /**
   * Runs just after component's creation, init the catalogue. 
   */
  ngOnInit() {
    this.initCatalogue();
  }

  /**
   * Gets the location, and then request the catalogue 
   * to be populated.
   */
  initCatalogue(): void {
    this.productService.getLocation().subscribe(
      response => this.getCatalogue(response.data),
      error => this.hasError = true
    );
  }

  /**
   * Populates the catalogue based on a location. 
   *
   * @param string location
   */
  getCatalogue(location: string): void {
    this.productService.getCatalogue(location).subscribe(
      response => this.populateCatalogue(response.data),
      error => this.hasError = true
    );
  }

  /**
   * Populates the local catalogue object, mapping 
   * all the products by category. 
   * Store the categories in order to render the panels
   * dinamically in the view.
   *
   * @param any catalogue
   */
  populateCatalogue(catalogue: any): void {
    for (let i in catalogue) {
      let category = catalogue[i].category.name;
      if (!this.catalogue[category]) {
        this.catalogue[category] = [];
      }

      this.catalogue[category].push(catalogue[i]);
    }
    this.categories = Object.keys(this.catalogue);
  }

  /**
   * Add a selected product to the basket.
   * If the checkbox is not selected, removes
   * the product from the basket.
   * 
   * @param number productID
   * @param string productName
   * @param any $event
   */
  addProductToBasket(productID: number, 
    productName: string, $event: any): void {
    if ($event.target.checked === true) {
      this.basket.push({id: productID, name: productName});
    } else {
      let i;
      for (i in this.basket) {
        if (productID === this.basket[i].id) 
          break;
      }
      this.basket.splice(i, 1);
    }
  }

  /**
   * Checkout the products.
   * Display confirmation or erro message, 
   * depending on the response status.
   */
  checkout(): void {
    if (this.basket.length === 0) {
      alert('Select at least one product.');
      return;
    }
    this.productService.checkout(this.basket).subscribe(
      response => this.showConfirmation = true,
      error => this.hasError = true
    );
  }

}
