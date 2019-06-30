import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { OrderService } from 'src/app/services/order.service';
declare var $: any;



@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
Items:Item[];
SelectedItem:Item;
SelectedItems:any[]=[];
SelectedItemPrice:number=0;
Quantity:number=0;
Total:number=0;
GrandTotal:number=0;
@Input() ExistingOrderItems?:any[];

@Output() GrandTotalChanged=new EventEmitter();

  constructor(private service:OrderService) { }

  ngOnInit() {

    if(this.ExistingOrderItems){
      console.log("logging the existing items of the order")
      console.log(this.ExistingOrderItems);
      this.SelectedItems=this.ExistingOrderItems;
    }

    this.service.GetItems().subscribe(succ=>{this.Items=succ;
    this.SelectedItems.forEach(x=>{
      let item=this.Items.find(x=>x.ItemID==x.ItemID);
      x.Name=item.Name;
      x.Price=item.Price;
      x.Total=x.Price*x.Quantity;
    })
    
    },err=>console.log(err));
  }

  onSelect=(model)=>{this.SelectedItemPrice=model.Price;
  this.Total=this.Quantity*this.SelectedItemPrice;

  if(!this.Total){this.Total=0;}
  console.log(this.Total);
  }
onKeyup=()=>{
  this.Total=this.Quantity*this.SelectedItemPrice;
  if(!this.Total){this.Total=0;}
  console.log(this.Total);}

openModal=(item)=>{document.getElementById("openModalButton").click();item.reset();

}

submitItem=(item)=>{

  if(item.value.Item&&item.value.Quantity)
{
  var select =item.value.Item;
  select.Quantity=item.value.Quantity;
  select.Total=item.controls['Total'].value;
  this.SelectedItems.push(select);
this.GrandTotal+=select.Total;
this.GrandTotalChanged.emit({'GrandTotal':this.GrandTotal,'Items':this.SelectedItems});
item.reset();
$('#myModal').modal('hide');
}
}


editItem=(i)=>
{

  this.GrandTotal-=this.SelectedItems[i].Total;
  this.SelectedItem=this.SelectedItems[i];
  this.SelectedItemPrice=this.SelectedItems[i].Price;
  this.Quantity=this.SelectedItems[i].Quantity;
  this.Total=this.Quantity*this.SelectedItemPrice;
  $('#myModal').modal('show');

  this.SelectedItems.splice(i,1);
  this.GrandTotalChanged.emit({'GrandTotal':this.GrandTotal,'Items':this.SelectedItems});

  

}

deleteItem=(i)=>
{if(confirm("Are you sure you want to delete this item?")){
  this.GrandTotal-=this.SelectedItems[i].Total;
  this.SelectedItems.splice(i,1);
  this.GrandTotalChanged.emit({'GrandTotal':this.GrandTotal,'Items':this.SelectedItems});
}

}


}
