namespace TextilTech.Models {
  public class SellModel {
    public required int Id { get; set; }
    public required int ProductId { get; set; }
    public required int CustomerId { get; set; }
    public required int Quantity { get; set; }
    public required float TotalPrice { get; set; }
    public required DateTime Date { get; set; }
    public required string PaymentMethod { get; set; }
  }
}

