using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Shop.Business.Interfaces;
using Shop.Filters;
using Shop.Models;
using Shop.ResponseModels;

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

        [HttpGet("[action]/{id}")]
        public Product GetProduct(int id)
        {
            return _service.Read(id);
        }
       
        [HttpGet("[action]/{amount}/{step}")]
        public GetProductsResponse GetProducts(int amount = 20, int step = 0, [FromQuery]ProductFilter filter = null)
        {
            if (amount > 1000)
            {
                throw new Exception($"Amount {amount} is over max of 1000 products");
            }

            var products = _service.List(amount, step, filter);
            return new GetProductsResponse
            {
                Products = products,
                Count = _service.Count()
            };
        }

        [HttpPost("[action]")]
        public bool CreateProducts([FromBody]Product product)
        {
            _service.Create(product);
            return true;
        }

        [HttpDelete("[action]/{productId}")]
        public bool DeleteProduct(int productId)
        {
            _service.Delete(productId);
            return true;
        }

        [HttpPut("[action]")]
        public bool Update([FromBody] Product product)
        {
            _service.Update(product);
            return true;
        }
    }
}
