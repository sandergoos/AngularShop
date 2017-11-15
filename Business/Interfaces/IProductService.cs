using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.Filters;
using Shop.Models;

namespace Shop.Business.Interfaces
{
    public interface IProductService
    {
        int Count();

        int Count(ProductFilter filter);

        void Create(Product product);

        Task CreateAsync(Product product);

        void Delete(int id);

        Task DeleteAsync(int id);

        IEnumerable<Product> List();

        IEnumerable<Product> List(int amount);

        IEnumerable<Product> List(int amount, int step);

        IEnumerable<Product> List(int amount, int step, ProductFilter filter);

        IEnumerable<Product> List(int amount, int step, ProductFilter filter, string orderyBy, bool desc = false);

        Task<IEnumerable<Product>> ListAsync(int amount, int step, ProductFilter filter, string orderyBy,
            bool desc = false);

        Product Read(int id);

        Task<Product> ReadAsync(int id);

        void Update(Product product);
    }
}