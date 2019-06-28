using MasterDetail.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MasterDetail.Controllers
{[RoutePrefix("api/orderno")]
    public class OrderNoController : ApiController
    {

        private RestaurantDBEntities db = new RestaurantDBEntities();



        [Route("")]
        [HttpGet]
        public IHttpActionResult GetGuid()
        {
            var newid = db.generate_guid().FirstOrDefault();
            if (newid != null)
                return Ok(newid);
            else return BadRequest("Not valid GUID");

        }

    }
}
