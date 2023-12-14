import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiResponse} from "../responce/ApiResponse";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity'];
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ApiResponse>("http://localhost:9999/inventory-service/products?projection=fullProduct")
      .subscribe({
        next: (data: ApiResponse) => {
          this.products = data._embedded.products || [];
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
  }
}
