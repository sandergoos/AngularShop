using Microsoft.EntityFrameworkCore;
using Shop.Models;

namespace Shop.DataContext
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Shop;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CompanyUser>()
                .HasKey(t => new { t.CompanyId, t.UserId });

            modelBuilder.Entity<CompanyUser>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.CompanyUsers)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<CompanyUser>()
                .HasOne(pt => pt.Company)
                .WithMany(t => t.CompanyUsers)
                .HasForeignKey(pt => pt.CompanyId);
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Company> Companies { get; set; }
    }
}
