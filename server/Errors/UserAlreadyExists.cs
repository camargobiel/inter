namespace TextilTech.Errors {
  public class UserAlreadyExists : Exception {
    public UserAlreadyExists() : base("user already exists") { }
  }
}
