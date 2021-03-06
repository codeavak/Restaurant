import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Item } from '../models/item';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
ItemCount:number=0;
  constructor(private http:HttpClient) { }

  GetCustomers = () =>  this.http.get<Customer[]>('http://localhost:62625/api/customers');

  GetOrderNo = ()=> this.http.get<string>('http://localhost:62625/api/orderno');

  GetItems = ()=> this.http.get<Item[]>('http://localhost:62625/api/items')
  IncreaseCount=()=>this.ItemCount++;

  PostOrder= (newOrder)=>this.http.post('http://localhost:62625/api/orders',newOrder)

  GetOrders=()=>this.http.get<any[]>('http://localhost:62625/api/orders')

  GetOrder=(id)=>this.http.get<Order>('http://localhost:62625/api/orders/'+id)

  DeleteOrder=(id)=>this.http.delete('http://localhost:62625/api/orders/'+id)
}
