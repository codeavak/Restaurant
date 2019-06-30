import { Customer } from './customer';
import { OrderItem } from './order-item';

export class Order {

  OrderID: number;
  OrderNo: string;
  Customer:Customer;
  CustomerID: number;
  
  PMethod: string;
  GTotal: number;
  OrderItems: OrderItem[]

}
