using Microsoft.AspNetCore.Http.HttpResults;
using TextilTech.Controllers.Models;
using TextilTech.Errors;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.UseCases.User {
  public class CreateUserUseCase {
    private readonly IUsersRepository _userRepository;
    private readonly ICompaniesRepository _companiesRepository;
    public CreateUserUseCase(
      IUsersRepository userRepository,
      ICompaniesRepository companiesRepository
    ) {
      _userRepository = userRepository;
      _companiesRepository = companiesRepository;
    }

    public async Task<UserModel> Execute(CreateUserParams userParams) {
      UserModel? user = await _userRepository.FindOneByEmail(userParams.email);
      if (user != null) throw new UserAlreadyExists();

      CompanyModel company = await _companiesRepository.Create(userParams.companyName);
      UserModel createdUser = new() {
        Name = userParams.name,
        Email = userParams.email,
        Password = userParams.password,
        CompanyId = company.Id
      };
      UserModel? createdUserResult = await _userRepository.Create(createdUser);
      return createdUserResult;
    }
  }
}
