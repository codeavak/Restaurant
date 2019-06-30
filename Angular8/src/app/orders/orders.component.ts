import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
Orders:any[];
  constructor(private service:OrderService,private router:Router) { }

  ngOnInit() {

    this.service.GetOrders().subscribe(succ=>{console.log(succ);this.Orders=succ},err=>console.log(err));
  }

  NewOrder=()=>{console.log("new order");  this.router.navigateByUrl('/order');
}
  editOrder=(id)=>{console.log(id);this.router.navigateByUrl('/order/'+id);}
  deleteOrder=(id)=>{console.log(id); 
    
    if(confirm("Are you sure you want to delete this order?")) 
  {this.service.DeleteOrder(id).subscribe(succ=>{
    let index=this.Orders.findIndex(i=>i.OrderID==id);
    this.Orders.splice(index,1); console.log("success")},err=>console.log("error"));}
}}
