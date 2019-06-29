import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
Orders:any[];
  constructor(private service:OrderService) { }

  ngOnInit() {

    this.service.GetOrders().subscribe(succ=>{console.log(succ);this.Orders=succ},err=>console.log(err));
  }

}
