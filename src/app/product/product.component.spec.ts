/**
 * Product component test class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { ProductServiceStub } from './product.service.stub';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        { 
          provide: ProductService, 
          useClass: ProductServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show confirmation message', () => {
    component.showConfirmation = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h4'));
    el = de.nativeElement; 
 
    expect(el.textContent).toContain('Confirmation');
  });

  it('should display error message', () => {
    component.hasError = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.alert'));
    el = de.nativeElement; 
 
    expect(el.textContent).toContain('Error fetching data from API');
  });

  it('should display a panel with category "Sports"', () => {
    component.populateCatalogue([{"id":1,"name":"Arsenal TV",
      "category":{"id":1,"name":"Sports"}}]);

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h4'));
    el = de.nativeElement; 
 
    expect(el.textContent).toContain('Sports');
  });

  it('should display a panel with channel "Arsenal TV"', () => {
    component.populateCatalogue([{"id":1,"name":"Arsenal TV",
      "category":{"id":1,"name":"Sports"}}]);
    
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.panel'));
    el = de.nativeElement; 
 
    expect(el.textContent).toContain('Arsenal TV');
  });
});
