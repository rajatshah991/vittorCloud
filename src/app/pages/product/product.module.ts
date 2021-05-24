import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductMaterialModule } from './product.material.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [{
  path:'', component:ProductListComponent,
},{
  path:'add',component:ProductAddComponent
}]


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
