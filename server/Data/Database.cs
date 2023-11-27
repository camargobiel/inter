using Microsoft.EntityFrameworkCore;
using TextilTech.Data.Map;
using TextilTech.Models;

namespace TextilTech.Data {
  public class DatabaseContext: DbContext {
    public DatabaseContext (DbContextOptions<DatabaseContext> options): base(options) {}

    public DbSet<UserModel> Users { get; set; }
    public DbSet<CustomerModel> Customers { get; set; }
    public DbSet<SellModel> Sells { get; set; }
    public DbSet<ProductModel> Products { get; set; }
    public DbSet<CompanyModel> Companies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.ApplyConfiguration(new UserMap());
      modelBuilder.ApplyConfiguration(new ProductMap());
      modelBuilder.ApplyConfiguration(new CustomerMap());
      modelBuilder.ApplyConfiguration(new SellMap());
      modelBuilder.ApplyConfiguration(new CompanyMap());
      modelBuilder.ApplyConfiguration(new ProductSellMap());
      base.OnModelCreating(modelBuilder);
    }
  }
}
