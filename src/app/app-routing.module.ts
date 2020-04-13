import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { ProductDetailComponent } from './products/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-main/product-edit/product-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'monitor', component: ProductMainComponent},
  {path: 'product', component: ProductMainComponent,
    children: [
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent,
        children: [
          {path: 'edit', component: ProductEditComponent}
        ]},
    ]},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
