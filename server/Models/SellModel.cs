using System.ComponentModel.DataAnnotations.Schema;

namespace TextilTech.Models {
  public class SellModel {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required int CompanyId { get; set; }
    public required int Quantity { get; set; }
    public required float TotalPrice { get; set; }
    public required DateTime Date { get; set; }
    public required string PaymentMethod { get; set; }
  }
}

