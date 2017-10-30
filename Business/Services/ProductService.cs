using System.Collections.Generic;
using System.Linq;
using Bogus;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Models;

namespace Shop.Business.Services
{
    public class ProductService : IProductService
    {
        private readonly ShopContext _context;

        public ProductService(ShopContext context)
        {
            _context = context;
        }

        public void Create(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var product = _context.Products.First(x => x.Id == id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public IEnumerable<Product> List(int amount = 20, int step = 0)
        {
            return _context.Products.Skip(step*amount).Take(amount);
        }
    }
}
