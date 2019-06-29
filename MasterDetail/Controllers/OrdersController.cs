using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MasterDetail.Models;
using MasterDetail.Resources;

namespace MasterDetail.Controllers
{
    public class OrdersController : ApiController
    {
        private RestaurantDBEntities db = new RestaurantDBEntities();

        // GET: api/Orders
        public IQueryable<OrderResource> GetOrders()
        {
            return db.Orders.Select(i => new OrderResource {

                
                CustomerID=i.CustomerID,
                 GTotal=i.GTotal,
                  OrderID=i.OrderID,
                   OrderNo=i.OrderNo,
                    PMethod=i.PMethod,
                    Customer=new CustomerResource { CustomerID=i.Customer.CustomerID,Name=i.Customer.Name}
                   
            });
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(long id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(long id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Orders
        [ResponseType(typeof(OrderResource))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(order);
            db.SaveChanges();

            var orderResource = new OrderResource
            {
                OrderID = order.OrderID,
                OrderNo = order.OrderNo,
                CustomerID = order.CustomerID,
                GTotal = order.GTotal,
                PMethod = order.PMethod
            };

            return CreatedAtRoute("DefaultApi", new { id = order.OrderID },orderResource);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(long id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(long id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}