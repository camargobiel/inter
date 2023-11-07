using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class CompanyMap : IEntityTypeConfiguration<CompanyModel> {
    public void Configure(EntityTypeBuilder<CompanyModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id).ValueGeneratedOnAdd();
    }
  }
}
