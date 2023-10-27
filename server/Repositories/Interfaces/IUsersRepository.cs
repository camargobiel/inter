using TextilTech.Models;

namespace TextilTech.Repositories.Interfaces {
  public interface IUsersRepository {
    Task<UserModel> Create(UserModel user);
    Task<UserModel> Read(int id);
  }
}
