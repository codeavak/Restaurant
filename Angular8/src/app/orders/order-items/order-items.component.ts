import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
Items:Item[];
SelectedItems:any[]=[];
SelectedItemPrice:number=0;
Quantity:number=0;
Total:number=0;
GrandTotal:number=0;

@Output() GrandTotalChanged=new EventEmitter();

  constructor(private service:OrderService) { }

  ngOnInit() {

    this.service.GetItems().subscribe(succ=>this.Items=succ,err=>console.log(err));
  }

  onSelect=(model)=>{this.SelectedItemPrice=model.value.Price;
  this.Total=parseInt(this.Quantity)*parseFloat(this.SelectedItemPrice);

  if(!this.Total){this.Total=0;}
  console.log(this.Total);
  }
onKeyup=()=>{
  this.Total=parseInt(this.Quantity)*parseFloat(this.SelectedItemPrice);
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
this.GrandTotal+=parseFloat(select.Total);
this.GrandTotalChanged.emit(this.GrandTotal);
item.reset();
$('#myModal').modal('hide');
}
}

deleteItem=(i)=>
{if(confirm("Are you sure you want to delete this item?"))this.SelectedItems.splice(i,1);}

}
