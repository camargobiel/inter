using Microsoft.AspNetCore.Mvc;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories.Results.CustomersRepository;

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
    public async Task<ActionResult<List<SellModel>>> GetSells(ReadAllSellsInput? input) {
      List<SellModel> result = await _sellsRepository.ReadAll(input);
      return Ok(result);
    }


    [HttpPost("/api/sells")]
    public async Task<ActionResult<SellModel>> CreateSell(SellModel sell) {
      SellModel result = await _sellsRepository.Create(sell);
      return Ok(result);
    }
  }
}
