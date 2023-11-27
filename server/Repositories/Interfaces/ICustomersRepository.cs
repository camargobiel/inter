using TextilTech.Models;
using TextilTech.Repositories.Results.CustomersRepository;

namespace TextilTech.Repositories.Interfaces {
  public interface ICustomersRepository {
    Task<CustomerModel> Create(CustomerModel customer);
    Task<CustomerModel?> Read(int id);
    Task<List<ReadAllResult>> ReadAll(int CompanyId);
    Task<CustomerModel> Update(CustomerModel customer);
    Task<CustomerModel> Delete(int id);
  }
}
