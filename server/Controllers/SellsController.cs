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

    [HttpGet("/api/sells")]
    public async Task<ActionResult<List<ReadAllSellsResult>>> GetSells(ReadAllSellsInput? input) {
      List<ReadAllSellsResult> result = await _sellsRepository.ReadAll(input);
      return Ok(result);
    }


    [HttpPost("/api/sells")]
    public async Task<ActionResult<SellModel>> CreateSell(CreateSellParams sell) {
      CreateSellUseCase useCase = new(_sellsRepository);
      SellModel result = await useCase.Execute(sell);
      return Ok(result);
    }
  }
}
