using System.ComponentModel.DataAnnotations.Schema;

namespace TextilTech.Models {
  public class ProductModel {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? NCM { get; set; }
    public string? Reference { get; set; }
    public required int CompanyId { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public required float Price { get; set; }
    public required string Category { get; set; }
  }
}
