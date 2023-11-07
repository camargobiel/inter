using System.ComponentModel.DataAnnotations.Schema;

namespace TextilTech.Models {
  public class CompanyModel {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Name { get; set; }
  }
}
