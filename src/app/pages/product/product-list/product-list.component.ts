import { ChangeDetectorRef, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ProductDetail } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit,OnChanges {
  displayedColumns: string[] = ['id','name','articalNo','price'];
  dataSource = new MatTableDataSource<ProductDetail>();
  searchTerm = new BehaviorSubject<string>('');
  searchVal = '';
  productListSubscription:Subscription;
  searchSubscription:Subscription;
  constructor(private router:Router ,private productService: ProductService,private cd: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngOnChanges():void {
    
  }
  goToAdd():void {
    this.router.navigate(['/product-info/add']);
  }

  search(event:any):void { 
    console.log(event.target.value);
    if(event.target.value.length>0) {
    this.searchTerm.next(event.target.value)
    this.searchTerm
      .pipe(
        map((e: any) => e),
        filter(
          (term) =>
            term.toString().trim() !== this.searchVal 
        ),
        switchMap(val => {
        this.searchVal=  val;
        return val;
        })
      ).subscribe(keyword=>{
        this.searchProduct(this.searchVal);
      })
    } else {
      this.getAllProduct();
    }

  }

  searchProduct(searchString:string):void {
    console.log(searchString);
    this.searchSubscription = this.productService.searchProduct(searchString).subscribe((res:ProductDetail[])=>{
      this.dataSource = new MatTableDataSource(res);
    });
  }
  /** Get All Product */
  getAllProduct():void {
  this.productListSubscription = this.productService.getProduct().subscribe((res:ProductDetail[])=>{
    this.dataSource = new MatTableDataSource(res);
    this.cd.detectChanges();
    console.log(res);
  })    
  }

  ngOnDestroy(): void {
    if(!!this.productListSubscription){
      this.productListSubscription.unsubscribe();
    } if(!!this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
