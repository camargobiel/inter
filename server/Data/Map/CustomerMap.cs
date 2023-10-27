using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class CustomerMap : IEntityTypeConfiguration<CustomerModel> {
    public void Configure(EntityTypeBuilder<CustomerModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
      builder.Property(x => x.Phone).HasMaxLength(150);
    }
  }
}
