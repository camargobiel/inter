using Microsoft.EntityFrameworkCore;
using TextilTech.Controllers.Models;
using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories.Results.SellsRepository;

namespace TextilTech.Repositories {
  public class SellsRepository: ISellsRepository {
    private readonly DatabaseContext _context;
    public SellsRepository(DatabaseContext context) {
      _context = context;
    }

    public async Task<SellModel> Create(CreateSellParams input) {
      SellModel sell = new()
      {
        Identifier = input.Identifier,
        PaymentMethod = input.PaymentMethod,
        TotalPrice = input.TotalPrice,
        CompanyId = input.CompanyId,
        Date = input.Date,
        CustomerId = input.CustomerId,
      };
      await _context.Sells.AddAsync(sell);

      for (int i = 0; i < input.ProductsIds.Length; i++) {
        ProductsSellModel productsSell = new()
        {
          ProductId = input.ProductsIds[i],
          SellId = sell.Id,
        };
        await _context.ProductsSells.AddAsync(productsSell);
      }
      await _context.SaveChangesAsync();
      return sell;
    }

    public async Task<List<ReadAllSellsResult>> ReadAll(ReadAllSellsInput? input) {
      List<SellModel> sells = await _context.Sells.ToListAsync();
      List<ReadAllSellsResult> results = new();
      foreach (SellModel sell in sells) {
        ReadAllSellsResult result = new()
        {
          Id = sell.Id,
          Identifier = sell.Identifier,
          PaymentMethod = sell.PaymentMethod,
          TotalPrice = sell.TotalPrice,
          CompanyId = sell.CompanyId,
          Date = sell.Date,
          CustomerId = sell.CustomerId,
          ProductsSells = await _context.ProductsSells.Where(ps => ps.SellId == sell.Id).ToListAsync(),
        };
        results.Add(result);
      }
      return results;
    }
  }
}
