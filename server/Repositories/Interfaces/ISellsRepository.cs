using TextilTech.Controllers.Models;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Results.SellsRepository;

namespace TextilTech.Repositories.Interfaces {
  public interface ISellsRepository {
    Task<SellModel> Create(CreateSellParams customer);
    Task<List<ReadAllSellsResult>> ReadAll(int companyId);
    Task<SellModel> Update(EditSellParams customer);
    Task<SellModel?> Delete(int id);
  }
}
