using Microsoft.AspNetCore.Mvc;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class UserController: ControllerBase {
    private readonly IUsersRepository _userRepository;
    public UserController(IUsersRepository userRepository) {
      _userRepository = userRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserModel>> GetSingleUser(int id) {
      UserModel? user = await _userRepository.FindOne(id);
      return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserModel>> CreateUser(UserModel user) {
      user.Id = new Random().Next(1, 1000);
      UserModel? createdUser = await _userRepository.Create(user);
      return Ok(createdUser);
    }
  }
}
