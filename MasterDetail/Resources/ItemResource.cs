using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MasterDetail.Resources
{
    public class ItemResource
    {
        public int ItemID { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
    }
}