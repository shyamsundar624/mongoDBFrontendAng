import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl="/api/v1/products"
  constructor(private http:HttpClient) { }

  fetchAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  createProduct(product:Product){
    return this.http.post<Product>(`${this.baseUrl}`,product);
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`,product);
  }
  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

}
