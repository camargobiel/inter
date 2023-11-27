using TextilTech.Controllers.Models;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.UseCases.Sell {
  public class CreateSellUseCase {
    private readonly ISellsRepository _sellsRepository;
    public CreateSellUseCase(
      ISellsRepository sellsRepository
    ) {
      _sellsRepository = sellsRepository;
    }

    public async Task<SellModel> Execute(CreateSellParams input) {
      return await _sellsRepository.Create(input);
    }
  }
}
