namespace TextilTech.Controllers.Models {
  public class CreateProductParams {
    public required string name { get; set; }
    public required string color { get; set; }
    public required string size { get; set; }
    public required float price { get; set; }
    public required string category { get; set; }
    public required string NCM { get; set; }
    public required string reference { get; set; }
  }
}
