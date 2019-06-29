import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';


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
OrderItems:any[];
  constructor(private service:OrderService,private router:Router ) {

   }

  ngOnInit() {


this.OrderCount=this.service.ItemCount;
    console.log("in component");

     this.service.GetCustomers().subscribe( succ=>{console.log(succ);this.Customers=succ;},err=>console.log(err));

     this.service.GetOrderNo().subscribe((succ)=>{console.log('successfully fetched order number');this.Orderno=succ;}, err=>console.log(err));
  }
  IncreaseCount=()=>{this.service.IncreaseCount();this.OrderCount=this.service.ItemCount;}

  RefreshGrandTotal=(GrandTotalAndItems)=>{
    console.log("refreshing Grandtotal now!");
   this.GrandTotal=GrandTotalAndItems.GrandTotal;
   console.log(GrandTotalAndItems.Items);
   this.OrderItems=GrandTotalAndItems.Items.map(i=>({ItemID:i.ItemID,Quantity:i.Quantity}));
  }

  submitForm=(form)=>
  {
    // console.log(form.value);console.log(form.controls['GrandTotal'].value);console.log(this.OrderItems);
var newOrder=({CustomerId:form.value.Customer.CustomerID,
  PMethod:form.value.Payment,
  OrderNo:this.Orderno,
  GTotal:this.GrandTotal,
  OrderItems:this.OrderItems
})
console.log(newOrder);
this.service.PostOrder(newOrder).subscribe(succ=>console.log("Successfully posted new model to database"),
err=>console.log("Error! We were unable to post new order to database"));
}

navigateToOrders=($event)=>{
  $event.preventDefault();
  this.router.navigateByUrl('/orders');

}
}
