/**
 * Product module class.
 *
 * @author Marcio C. de Souza<m4rcio.souza@gmail.com>
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ProductComponent ],
  exports: [ ProductComponent ],
  providers: [ ProductService ]
})
export class ProductModule { }
