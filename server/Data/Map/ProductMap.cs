using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class ProductMap : IEntityTypeConfiguration<ProductModel> {
    public void Configure(EntityTypeBuilder<ProductModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
      builder.Property(x => x.Color).HasMaxLength(255);
      builder.Property(x => x.Size).HasMaxLength(10);
      builder.Property(x => x.Price).IsRequired().HasMaxLength(255);
      builder.Property(x => x.Category).HasMaxLength(255);
    }
  }
}
