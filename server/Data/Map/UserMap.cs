using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TextilTech.Models;

namespace TextilTech.Data.Map {
  public class UserMap : IEntityTypeConfiguration<UserModel> {
    public void Configure(EntityTypeBuilder<UserModel> builder) {
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
      builder.Property(x => x.Email).IsRequired().HasMaxLength(150);
      builder.Property(x => x.Password).IsRequired().HasMaxLength(255);
    }
  }
}
