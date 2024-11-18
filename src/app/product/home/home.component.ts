import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,
    MatButtonModule,MatTableModule,MatSortModule,MatPaginatorModule,
    CommonModule,FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'category', 'brand','edit','delete'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  products:Product[]=[];
  filteredProducts:Product[]=[];
  product:Product={
    id:0,
    name:'',
    category:'',
    brand:''
  }

  constructor(private productService:ProductService){}
  ngAfterViewInit(): void {
    this.productService.fetchAllProducts().subscribe((data)=>{
      console.log(data)
      this.products=data;
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  searchProducts(input:string){
this.filteredProducts=this.products.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
|| item.category.toLowerCase().includes(input.toLowerCase())
|| item.brand.toLowerCase().includes(input.toLowerCase())
)

this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);

  }

  addOrEditProduct(prod:Product){
    if(prod.id!==0){
      this.productService.updateProduct(prod).subscribe({
        next:(data)=>{
          console.log("Product updated Successfully");
          window.location.reload();
        },
        error:(err)=>{
          console.log(err)
        }
      });
    }else{
this.productService.createProduct(prod).subscribe({
  next:(data)=>{
    console.log("Product Created Successfully");
    window.location.reload();
  },
  error:(err)=>{
    console.log(err)
  }
});

    }
  }
  setProduct(prod:Product){
    this.product.id=prod.id;
    this.product.name=prod.name;
    this.product.category=prod.category;
    this.product.brand=prod.brand;
  }

  deleteProduct(id:number){
    const isConfirmed=window.confirm('Are you sure you want to Delete')
if(isConfirmed){
    this.productService.deleteProduct(id).subscribe((data)=>{
      this.products=this.products.filter(item=>item.id!==id);
    })
    window.location.reload();
}
  }
}
