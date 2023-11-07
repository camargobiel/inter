namespace TextilTech.Models {
  public class ProductModel {
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required int CompanyId { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public required float Price { get; set; }
    public required string Category { get; set; }
  }
}
