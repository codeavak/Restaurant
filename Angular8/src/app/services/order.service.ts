import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  GetCustomers = () =>  this.http.get('http://localhost:62625/api/customers');
}
