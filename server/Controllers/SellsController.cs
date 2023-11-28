using Microsoft.AspNetCore.Mvc;
using TextilTech.Controllers.Models;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories.Results.SellsRepository;
using TextilTech.UseCases.Sell;

namespace TextilTech.Repositories {
  [Route("api/[Controller]")]
  [ApiController]

  public class SellsController : ControllerBase {
    private readonly ISellsRepository _sellsRepository;

    public SellsController(
      ISellsRepository sellsRepository
    ) {
      _sellsRepository = sellsRepository;
    }

    [HttpGet("/api/sells/{companyId}")]
    public async Task<ActionResult<List<ReadAllSellsResult>>> GetSells(int companyId) {
      List<ReadAllSellsResult> result = await _sellsRepository.ReadAll(companyId);
      return Ok(result);
    }


    [HttpPost("/api/sells")]
    public async Task<ActionResult<SellModel>> CreateSell(CreateSellParams sell) {
      CreateSellUseCase useCase = new(_sellsRepository);
      SellModel result = await useCase.Execute(sell);
      return Ok(result);
    }

    [HttpPut("/api/sells")]
    public async Task<ActionResult<SellModel>> UpdateSell(EditSellParams sell) {
      SellModel result = await _sellsRepository.Update(sell);
      return Ok(result);
    }

    [HttpDelete("/api/sells/{id}")]
    public async Task<ActionResult<SellModel?>> DeleteSell(int id) {
      SellModel? result = await _sellsRepository.Delete(id);
      return Ok(result);
    }
  }
}
