using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class ProductSellMap : IEntityTypeConfiguration<ProductsSellModel> {
    public void Configure(EntityTypeBuilder<ProductsSellModel> builder) {
      builder.HasKey(x => x.Id);
      builder.HasKey(x => x.SellId);
      builder.HasKey(x => x.ProductId);
    }
  }
}
