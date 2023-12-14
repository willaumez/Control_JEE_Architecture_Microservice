import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get("http://localhost:9999/customer-service/customers?projection=fullCustomer")
      .subscribe({
        next: (data: any) => {
          this.customers = new MatTableDataSource(data?._embedded?.customers);
        },
        error: (err) => {
          // Gérer l'erreur
        }
      });
  }

  getOrders(c: any) {
    this.router.navigateByUrl("/orders/" + c.id);
  }
}
