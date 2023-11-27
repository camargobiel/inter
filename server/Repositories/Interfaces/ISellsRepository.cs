using TextilTech.Models;
using TextilTech.Repositories.Inputs;

namespace TextilTech.Repositories.Interfaces {
  public interface ISellsRepository {
    Task<SellModel> Create(SellModel customer);
    Task<List<SellModel>> ReadAll(ReadAllSellsInput? input);
/*     Task<CustomerModel> Read(int id);
    Task<CustomerModel> Update(CustomerModel customer);
    Task<bool> Delete(int id); */
  }
}
