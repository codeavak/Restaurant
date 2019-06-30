using MasterDetail.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MasterDetail.Resources
{
    public class OrderResource
    {
       

        public long OrderID { get; set; }
        public string OrderNo { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public string PMethod { get; set; }
        public Nullable<decimal> GTotal { get; set; }
        public virtual CustomerResource Customer { get; set; }
        public IEnumerable<OrderItemResource> OrderItems { get; set; }

    }
}