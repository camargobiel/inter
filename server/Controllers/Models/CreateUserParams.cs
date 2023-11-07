namespace TextilTech.Controllers.Models {
  public class CreateUserParams {
    public required string name { get; set; }
    public required string email { get; set; }
    public required string password { get; set; }
    public required string companyName { get; set; }
  }
}
