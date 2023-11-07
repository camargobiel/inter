using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Repositories {
  public class CompaniesRepository: ICompaniesRepository {
    private readonly DatabaseContext _context;
    public CompaniesRepository(DatabaseContext context) {
      _context = context;
    }
    public async Task<CompanyModel> Create(string name) {
      var company = new CompanyModel {
        Name = name
      };
      await _context.Companies.AddAsync(company);
      await _context.SaveChangesAsync();
      return company;
    }
  }
}
