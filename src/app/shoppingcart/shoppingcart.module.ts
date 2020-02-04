import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingcartRoutingModule} from './shoppingcart-routing.module';
import { ShoppingcartComponent } from './component/shoppingcart.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';




@NgModule({
  declarations: [ShoppingcartComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShoppingcartRoutingModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng5SliderModule
  ],
  exports : [],
  providers: []
})
export class ShoppingcartModule { }
