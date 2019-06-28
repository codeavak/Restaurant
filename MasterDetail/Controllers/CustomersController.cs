﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using MasterDetail.Models;
using MasterDetail.Resources;

namespace MasterDetail.Controllers
{[RoutePrefix("customers")]
    public class CustomersController : ApiController
    {
        private RestaurantDBEntities db = new RestaurantDBEntities();

        [Route("guid")]
        [HttpGet]
        public IHttpActionResult GetGuid()
        {
            var newid = db.generate_guid().FirstOrDefault();
            if (newid != null)
                return Ok(newid);
            else return BadRequest("Not valid GUID");

        }


        // GET: api/Customers
        [Route("")]
        [HttpGet]
        public IQueryable<CustomerResource> GetCustomers()
        {
            var customers = db.Customers.Select(c => new CustomerResource { CustomerID = c.CustomerID, Name = c.Name });

            return customers;
        }

        // GET: api/Customers/5
        [Route("{id}")]
        [HttpGet]
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(int id)
        {

            
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(new CustomerResource { CustomerID = customer.CustomerID, Name = customer.Name });
        }

        [Route("{id}")]
        [HttpPut]
        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        [Route("")]
        [HttpPost]
        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.CustomerID }, customer);
        }

        [Route("{id}")]
        [HttpDelete]
        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.CustomerID == id) > 0;
        }
    }
}