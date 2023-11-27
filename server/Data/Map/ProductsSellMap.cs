using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class ProductSellMap : IEntityTypeConfiguration<ProductsSellModel> {
    public void Configure(EntityTypeBuilder<ProductsSellModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.SellId).IsRequired();
      builder.Property(x => x.ProductId).IsRequired();
    }
  }
}
