using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Filters;
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
            product.CreatedAt = DateTime.UtcNow;
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var product = _context.Products.First(x => x.Id == id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public int Count()
        {
            return _context.Products.Count();
        }

        public Product Read(int id)
        {
            return _context.Products.FirstOrDefault(x => x.Id == id);
        }

        public void Update(Product product)
        {
            _context.Products.Attach(product);
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public IEnumerable<Product> List()
        {
            return _context.Products.OrderBy(x => x.Id);
        }

        public IEnumerable<Product> List(int amount)
        {
            return _context.Products.OrderBy(x => x.Id).Take(amount);
        }

        public IEnumerable<Product> List(int amount, int step)
        {
            return _context.Products.OrderBy(x => x.Id).Skip(step * amount).Take(amount);
        }

        public IEnumerable<Product> List(int amount, int step, ProductFilter filter)
        {
            return _context.Products
                .Where(
                    p => (string.IsNullOrEmpty(filter.Name) || p.Name.Contains(filter.Name)) &&
                         p.Price >= filter.PriceFrom &&
                         (filter.PriceTill == 0 || p.Price <= filter.PriceTill)
                )
                .OrderBy(x => x.Id)
                .Skip(step * amount)
                .Take(amount);
        }



    }
}
