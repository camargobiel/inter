namespace TextilTech.Models {
  public class CustomerModel {
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required int CompanyId { get; set; }
    public string? Phone { get; set; }

  }
}

