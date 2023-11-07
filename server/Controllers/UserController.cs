using Microsoft.AspNetCore.Mvc;
using TextilTech.Controllers.Models;
using TextilTech.Domain.Entities;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using TextilTech.UseCases.User;
using Microsoft.AspNetCore.Http.HttpResults;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class UserController : ControllerBase {
    private readonly IUsersRepository _userRepository;
    private readonly ICompaniesRepository _companiesRepository;
    private readonly IConfiguration _configuration;
    public UserController(
      IUsersRepository userRepository,
      IConfiguration configuration,
      ICompaniesRepository companiesRepository
    ) {
      _userRepository = userRepository;
      _configuration = configuration;
      _companiesRepository = companiesRepository;
    }

    [HttpPost("/api/User/auth")]
    public async Task<ActionResult<AuthenticateUserParams>> AuthenticateUser(AuthenticateUserParams user) {
      UserModel? existentUser = await _userRepository.FindOneByEmail(user.Email);
      if (existentUser == null) {
        return NotFound();
      }
      UserTokenEntity token = BuildToken(user);
      return new OkObjectResult(new {
        token = token.Token,
        user = existentUser
      });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserModel>> GetSingleUser(int id) {
      UserModel? user = await _userRepository.FindOneById(id);
      return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserModel>> CreateUser(CreateUserParams userParams) {
      try {
        CreateUserUseCase useCase = new(_userRepository, _companiesRepository);
        UserModel result = await useCase.Execute(userParams);
        return Ok(result);
      }
      catch (Exception ex) {
        if (ex.Message == "user already exists") {
          return Conflict();
        }
        return BadRequest();
      }
    }

    private UserTokenEntity BuildToken(AuthenticateUserParams user) {
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
        new Claim("meuValor", "oque voce quiser"),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      };
      SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
      SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);
      DateTime expiration = DateTime.UtcNow.AddHours(1);
      JwtSecurityToken token = new(
        issuer: null,
        audience: null,
        claims: claims,
        expires: expiration,
        signingCredentials: signingCredentials
      );
      return new UserTokenEntity() {
        Token = new JwtSecurityTokenHandler().WriteToken(token),
      };
    }
  }
}
