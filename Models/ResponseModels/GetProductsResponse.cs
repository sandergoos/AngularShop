using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shop.Models;

namespace Shop.ResponseModels
{
    public class GetProductsResponse
    {
        public IEnumerable<Product> Products { get; set; }
        public int Count { get; set; }
    }
}
