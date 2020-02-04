import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingcartComponent } from './component/shoppingcart.component';

const routes: Routes = [
    { path: '', component: ShoppingcartComponent },
];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ShoppingcartRoutingModule { }
