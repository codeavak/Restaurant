import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private service:OrderService ) {

   }

  ngOnInit() {
    console.log("in component");
     this.service.GetCustomers().subscribe( succ=>console.log(succ),err=>console.log(err));
  }

}
