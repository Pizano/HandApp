import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path : 'products', component : ProductComponent },
  { path : 'create', component : ProductCreateComponent },
  { path: 'detail/:id', component: ProductDetailsComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
