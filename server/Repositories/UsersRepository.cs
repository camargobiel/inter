using Microsoft.EntityFrameworkCore;
using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Repositories {
  public class UsersRepository : IUsersRepository {
    private readonly DatabaseContext _context;
    public UsersRepository(DatabaseContext context) {
      _context = context;
    }
    public async Task<UserModel> Create(UserModel user) {
      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();
      return user;
    }

    public async Task<UserModel?> FindOne(int id) {
      UserModel? user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
      return user;
    }
  }
}
