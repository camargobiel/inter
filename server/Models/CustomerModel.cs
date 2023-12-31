using System.ComponentModel.DataAnnotations.Schema;

namespace TextilTech.Models {
  public class CustomerModel {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? Id { get; set; }
    public required string Name { get; set; }
    public required int CompanyId { get; set; }
    public string? Phone { get; set; }

  }
}

