using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.Business.Interfaces;
using Shop.Filters;
using Shop.Models;
using Shop.ResponseModels;

namespace Shop.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpPost("[action]")]
        public async Task<bool> CreateProducts([FromBody] Product product)
        {
            await _service.CreateAsync(product);
            return true;
        }

        [HttpDelete("[action]/{productId}")]
        public async Task<bool> DeleteProduct(int productId)
        {
            await _service.DeleteAsync(productId);
            return true;
        }

        [HttpGet("[action]/{id}")]
        public async Task<Product> GetProduct(int id)
        {
            return await _service.ReadAsync(id);
        }

        [HttpGet("[action]/{amount}/{step}")]
        public async Task<GetProductsResponse> GetProducts(int amount, int step, [FromQuery] ProductFilter filter)
        {
            if (amount > 1000)
                throw new Exception($"Amount {amount} is over max of 1000 products");

            var products = await _service.ListAsync(amount, step, filter, filter.OrderBy, filter.Desc);
            return new GetProductsResponse
            {
                Products = products,
                Count = _service.Count(filter)
            };
        }

        [HttpPut("[action]")]
        public bool Update([FromBody] Product product)
        {
            _service.Update(product);
            return true;
        }
    }
}