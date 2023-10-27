using Microsoft.EntityFrameworkCore;
using TextilTech.Models;

namespace TextilTech.Data {
  public class DatabaseContext: DbContext {
    public DatabaseContext (DbContextOptions<DatabaseContext> options): base(options) {}

    public DbSet<UserModel> Users { get; set; }
    public DbSet<CustomerModel> Customers { get; set; }
    public DbSet<SellModel> Sells { get; set; }
    public DbSet<ProductModel> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      base.OnModelCreating(modelBuilder);
    }
  }
}
