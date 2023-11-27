using TextilTech.Models;

namespace TextilTech.Repositories.Results.SellsRepository {
  public class ReadAllSellsResult {
    public int Id { get; set; }
    public required string Identifier { get; set; }
    public required string PaymentMethod { get; set; }
    public required float TotalPrice { get; set; }
    public required int CompanyId { get; set; }
    public required DateTime Date { get; set; }
    public required int CustomerId { get; set; }
    public required List<ProductsSellModel> ProductsSells { get; set; }
  }
}
