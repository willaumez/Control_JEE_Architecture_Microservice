import {RouterModule, Routes} from '@angular/router';

import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path : "products", component : ProductsComponent
  },
  {
    path : "new-product", component : NewProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

