namespace TextilTech.Errors {
  public class UserAlreadyExists : Exception {
    public UserAlreadyExists() : base("USER_ALREADY_EXISTS") { }
  }
}
