using TextilTech.Models;

namespace TextilTech.Repositories.Interfaces {
  public interface ICustomersRepository {
    Task<CustomerModel> Create(CustomerModel customer);
    Task<CustomerModel> Read(Guid id);
    Task<List<CustomerModel>> ReadAll();
    Task<CustomerModel> Update(CustomerModel customer);
    Task<bool> Delete(Guid id);
  }
}
