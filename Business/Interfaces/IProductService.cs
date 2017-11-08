using System.Collections.Generic;
using Shop.Filters;
using Shop.Models;

namespace Shop.Business.Interfaces
{

    public interface IProductService
    {
        void Create(Product product);

        void Delete(int id);

        IEnumerable<Product> List();

        IEnumerable<Product> List(int amount);

        IEnumerable<Product> List(int amount, int step);

        IEnumerable<Product> List(int amount, int step, ProductFilter filter);

        int Count();

        Product Read(int id);

        void Update(Product product);
    }
}
