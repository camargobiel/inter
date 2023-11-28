namespace TextilTech.Repositories.Results.CustomersRepository {
  public class ReadAllResult {
    public int? Id { get; set; }
    public required string Name { get; set; }
    public required int CompanyId { get; set; }
    public string? Phone { get; set; }
    public required int PurchaseCount { get; set; }
    public string? MostPurchasedProduct { get; set; }
  }
}
