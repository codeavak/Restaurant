import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  GrandTotal:number=0;
Customers:Customer[];
Orderno:string;
OrderCount:number;

  constructor(private service:OrderService ) {

   }

  ngOnInit() {


this.OrderCount=this.service.ItemCount;
    console.log("in component");

     this.service.GetCustomers().subscribe( succ=>{console.log(succ);this.Customers=succ;},err=>console.log(err));

     this.service.GetOrderNo().subscribe((succ)=>{console.log('successfully fetched order number');this.Orderno=succ;}, err=>console.log(err));
  }
  IncreaseCount=()=>{this.service.IncreaseCount();this.OrderCount=this.service.ItemCount;}

  RefreshGrandTotal=(GrandTotal)=>{
    console.log("refreshing Grandtotal now!");
   this.GrandTotal=GrandTotal;
  }
}
