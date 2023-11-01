using Microsoft.AspNetCore.Mvc;
using TextilTech.Controllers.Models;
using TextilTech.Domain.Entities;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class UserController: ControllerBase {
    private readonly IUsersRepository _userRepository;
    private readonly IConfiguration _configuration;
    public UserController(IUsersRepository userRepository, IConfiguration configuration) {
      _userRepository = userRepository;
      _configuration = configuration;
    }

    [HttpPost("/api/User/auth")]
    public async Task<ActionResult<AuthenticateUserParams>> AuthenticateUser(AuthenticateUserParams user) {
      UserModel? teste = await _userRepository.FindOneByEmail(user.Email);
      if (teste == null) {
        return NotFound();
      }
      UserTokenEntity token = this.BuildToken(user);

      return Ok(token);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserModel>> GetSingleUser(int id) {
      UserModel? user = await _userRepository.FindOneById(id);
      return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserModel>> CreateUser(UserModel user) {
      user.Id = new Random().Next(1, 1000);
      UserModel? createdUser = await _userRepository.Create(user);
      return Ok(createdUser);
    }

    private UserTokenEntity BuildToken(AuthenticateUserParams user) {
      var claims = new[]
      {
          new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
          new Claim("meuValor", "oque voce quiser"),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      };
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var expiration = DateTime.UtcNow.AddHours(1);
      JwtSecurityToken token = new JwtSecurityToken(
        issuer: null,
        audience: null,
        claims: claims,
        expires: expiration,
        signingCredentials: creds
      );
      return new UserTokenEntity() {
        Token = new JwtSecurityTokenHandler().WriteToken(token),
      };
    }
  }
}
