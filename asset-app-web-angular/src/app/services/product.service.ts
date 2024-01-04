import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //Methode get products
/*  public getProducts(page: number=1, size:number=10):Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }*/

  public getProducts(keyword: string="", page: number=1, size:number=10){
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  //Methode check product
  public checkProduct(product: Product):Observable<any> {
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }

  //Methode delete product
  public deleteProduct(product: Product) {
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`);
  }

  //Methode add product
  public addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`, newProduct);
  }

  //Methode search product
/*  public searchProducts(keyword: string, currentPage: number, pageSize: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${currentPage}&_limit=${pageSize}`);
  }*/

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }


}
