using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.Business.Interfaces;
using Shop.DataContext;
using Shop.Filters;
using Shop.Helpers;
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

        public async Task CreateAsync(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public void Delete(int id)
        {
            var product = _context.Products.First(x => x.Id == id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public async Task DeleteAsync(int id)
        {
            var product = _context.Products.First(x => x.Id == id);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Product> List(int amount, int step, ProductFilter filter, string orderyBy, bool desc = false)
        {
            var products = _context.Products
                .Where(
                    p => (string.IsNullOrEmpty(filter.Name) || p.Name.Contains(filter.Name)) &&
                         p.Price >= filter.PriceFrom &&
                         (filter.PriceTill == 0 || p.Price <= filter.PriceTill)
                );

            var propertyInfo = typeof(Product).GetProperty(orderyBy.FirstCharToUpper());
            if (propertyInfo == null)
                return products.OrderBy(x => x.Id)
                    .Skip(step * amount)
                    .Take(amount);

            if (desc)
                return products.OrderByDescending(x => propertyInfo.GetValue(x, null))
                    .Skip(step * amount)
                    .Take(amount);

            return products.OrderBy(x => propertyInfo
                    .GetValue(x, null))
                .Skip(step * amount)
                .Take(amount);
        }

        public async Task<IEnumerable<Product>> ListAsync(int amount, int step, ProductFilter filter, string orderyBy,
            bool desc = false)
        {
            var products = _context.Products
                .Where(
                    p => (string.IsNullOrEmpty(filter.Name) || p.Name.Contains(filter.Name)) &&
                         p.Price >= filter.PriceFrom &&
                         (filter.PriceTill == 0 || p.Price <= filter.PriceTill)
                );

            var propertyInfo = typeof(Product).GetProperty(orderyBy.FirstCharToUpper());
            if (propertyInfo == null)
                return await products.OrderBy(x => x.Id)
                    .Skip(step * amount)
                    .Take(amount).ToListAsync();

            if (desc)
                return await products.OrderByDescending(x => propertyInfo.GetValue(x, null))
                    .Skip(step * amount)
                    .Take(amount).ToListAsync();

            return await products.OrderBy(x => propertyInfo
                    .GetValue(x, null))
                .Skip(step * amount)
                .Take(amount).ToListAsync();
        }

        public int Count()
        {
            return _context.Products.Count();
        }

        public int Count(ProductFilter filter)
        {
            return _context.Products.Count(p => (string.IsNullOrEmpty(filter.Name) || p.Name.Contains(filter.Name)) &&
                                                p.Price >= filter.PriceFrom &&
                                                (filter.PriceTill == 0 || p.Price <= filter.PriceTill));
        }

        public Product Read(int id)
        {
            return _context.Products.FirstOrDefault(x => x.Id == id);
        }

        public async Task<Product> ReadAsync(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
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