import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';


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
SelectedCustomer:any;
SelectedPMethod:any;
ExistingItems:any[]=null;
  constructor(private service:OrderService,private router:Router, private route:ActivatedRoute) {

   }

  ngOnInit() {
    let id;
    this.route.paramMap.subscribe(params=>id=params.get('id'));

if(id)
{console.log("gotto fetch the order now");
this.service.GetCustomers().subscribe( succ=>{console.log("got all customers");this.Customers=succ;

  this.service.GetOrder(id).subscribe(succ=>{console.log(succ);
  
  this.SelectedCustomer=succ.CustomerID;
  this.SelectedPMethod=succ.PMethod;
  this.Orderno=succ.OrderNo;
  this.GrandTotal=succ.GTotal;
  this.ExistingItems=succ.OrderItems;
  console.log(this.Customers);
  console.log(this.SelectedCustomer);
},err=>console.log(err));
},err=>console.log(err));


}else
    {this.ExistingItems=[];
this.OrderCount=this.service.ItemCount;
    console.log("in component");

     this.service.GetCustomers().subscribe( succ=>{console.log(succ);this.Customers=succ;},err=>console.log(err));

     this.service.GetOrderNo().subscribe((succ)=>{console.log('successfully fetched order number');this.Orderno=succ;}, err=>console.log(err));
  }
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
var newOrder=({CustomerId:this.SelectedCustomer,
  PMethod:this.SelectedPMethod,
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
