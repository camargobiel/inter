namespace TextilTech.Controllers.Models {
  public class CreateSellParams {
    public required string Identifier { get; set; }
    public required int CompanyId { get; set; }
    public required string PaymentMethod  { get; set; }
    public required int TotalPrice { get; set; }
    public required DateTime Date { get; set; }
    public required int CustomerId { get; set; }
    public required int[] ProductsIds { get; set; }
  }
}
