import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';



@NgModule({
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      exports:[
        MatPaginatorModule,
        MatTableModule,
      ]
})
export class ProductMaterialModule { }
