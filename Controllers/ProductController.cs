using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;
using Microsoft.AspNetCore.Mvc;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Models;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }
       
        [HttpGet("[action]/{amount}/{step}")]
        public IEnumerable<Product> GetProducts(int amount = 20, int step = 0)
        {
            if (amount > 1000)
            {
                throw new Exception($"Amount {amount} is over max of 1000 products");
            }

            return _service.List(amount, step);
        }

        [HttpPost("[action]")]
        public bool CreateProducts([FromBody]Product product)
        {
            _service.Create(product);
            return true;
        }
    }
}
