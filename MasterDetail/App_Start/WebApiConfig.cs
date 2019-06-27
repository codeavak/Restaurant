using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MasterDetail
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var corsAttr = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(corsAttr);
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
    //public static class WebApiConfig
    //{
    //    public static void Register(HttpConfiguration config)
    //    {
    //        // Web API configuration and services

    //        // Web API routes
    //        config.MapHttpAttributeRoutes();

    //        config.Routes.MapHttpRoute(
    //            name: "DefaultApi",
    //            routeTemplate: "api/{controller}/{id}",
    //            defaults: new { id = RouteParameter.Optional }
    //        );
    //    }
    //}
}
