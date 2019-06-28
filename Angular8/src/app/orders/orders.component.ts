import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
customers:Customer[];
  constructor(private service:OrderService ) {

   }

  ngOnInit() {
    console.log("in component");
     this.service.GetCustomers().subscribe( succ=>{console.log(succ);this.customers=succ;},err=>console.log(err));
  }

}
