using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class SellMap : IEntityTypeConfiguration<SellModel> {
    public void Configure(EntityTypeBuilder<SellModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.ProductId).IsRequired();
      builder.Property(x => x.CustomerId).IsRequired();
      builder.Property(x => x.Date).IsRequired();
      builder.Property(x => x.Quantity).IsRequired();
      builder.Property(x => x.TotalPrice).IsRequired();
      builder.Property(x => x.PaymentMethod).IsRequired().HasMaxLength(255);
    }
  }
}
