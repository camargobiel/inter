using System.ComponentModel.DataAnnotations.Schema;

namespace TextilTech.Models {
  public class UserModel {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required int CompanyId { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
  }
}


