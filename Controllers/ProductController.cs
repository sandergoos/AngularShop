using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;
using Microsoft.AspNetCore.Mvc;

namespace Shop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {

        [HttpGet("[action]/{amount}")]
        public IEnumerable<Product> GetProducts(int amount = 20)
        {
            if (amount > 1000)
            {
                throw new Exception($"Amount {amount} is over max of 1000 products");
            }

            return Enumerable.Range(1, amount).Select(x => new Faker<Product>()
                .RuleFor( p => p.Id, f => x)
                .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                .RuleFor(p => p.Description, f => f.Commerce.ProductAdjective())
                .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price()))
                .Generate()
            );
        }

        public class Product
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public decimal Price { get; set; }
        }
    }
}
