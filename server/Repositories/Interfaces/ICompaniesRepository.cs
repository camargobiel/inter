using TextilTech.Models;

namespace TextilTech.Repositories.Interfaces {
  public interface ICompaniesRepository {
    Task<CompanyModel> Create(string name);
  }
}
