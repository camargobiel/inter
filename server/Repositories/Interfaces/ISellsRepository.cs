using TextilTech.Controllers.Models;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Results.SellsRepository;

namespace TextilTech.Repositories.Interfaces {
  public interface ISellsRepository {
    Task<SellModel> Create(CreateSellParams customer);
    Task<List<ReadAllSellsResult>> ReadAll(ReadAllSellsInput? input);

/*     Task<CustomerModel> Read(int id);
    Task<CustomerModel> Update(CustomerModel customer);
    Task<bool> Delete(int id); */
  }
}
