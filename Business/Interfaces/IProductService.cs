using System;
using System.Collections.Generic;
using Shop.Models;

namespace Shop.Business.Interfaces
{

    public interface IProductService
    {
        void Create(Product product);
        void Delete(int id);
        IEnumerable<Product> List(int amount = 20, int step = 0);
    }
}
