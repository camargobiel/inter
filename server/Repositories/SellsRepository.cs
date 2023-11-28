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
      var createdSell = await _context.Sells.AddAsync(sell);
      await _context.SaveChangesAsync();

      for (int i = 0; i < input.ProductsIds.Length; i++) {
        ProductsSellModel productsSell = new()
        {
          ProductId = input.ProductsIds[i],
          SellId = createdSell.Entity.Id,
        };
        await _context.ProductsSells.AddAsync(productsSell);
      }
      await _context.SaveChangesAsync();
      return sell;
    }

    public async Task<List<ReadAllSellsResult>> ReadAll(int companyId) {
      List<SellModel> sells = await _context.Sells.Where(
        sell => sell.CompanyId == companyId
      ).ToListAsync();
      List<ReadAllSellsResult> results = new();

      foreach (SellModel sell in sells) {
        List<ProductsSellModel> productsSells = await _context.ProductsSells.Where(
          productsSell => productsSell.SellId == sell.Id
        ).ToListAsync();
        ReadAllSellsResult result = new()
        {
          Id = sell.Id,
          Identifier = sell.Identifier,
          PaymentMethod = sell.PaymentMethod,
          TotalPrice = sell.TotalPrice,
          CompanyId = sell.CompanyId,
          Date = sell.Date,
          CustomerId = sell.CustomerId,
          ProductsSells = productsSells,
          CustomerName = await _context.Customers.Where(
            customer => customer.Id == sell.CustomerId
          ).Select(
            customer => customer.Name
          ).FirstOrDefaultAsync(),
          ProductsNames = await _context.Products.Where(
            product => productsSells.Select(
              productsSell => productsSell.ProductId
            ).Contains(product.Id)
          ).Select(
            product => product.Name
          ).ToArrayAsync(),
        };
        results.Add(result);
      }
      return results;
    }

    public async Task<SellModel> Update(EditSellParams input) {
      SellModel sell = new()
      {
        Id = input.Id,
        Identifier = input.Identifier,
        PaymentMethod = input.PaymentMethod,
        TotalPrice = input.TotalPrice,
        CompanyId = input.CompanyId,
        Date = input.Date,
        CustomerId = input.CustomerId,
      };
      var updatedSell = _context.Sells.Update(sell);
      await _context.SaveChangesAsync();
      List<ProductsSellModel> productsSells = await _context.ProductsSells.Where(
        productsSell => productsSell.SellId == updatedSell.Entity.Id
      ).ToListAsync();
      foreach (ProductsSellModel productsSell in productsSells) {
        _context.ProductsSells.Remove(productsSell);
      }
      for (int i = 0; i < input.ProductsIds.Length; i++) {
        ProductsSellModel productsSell = new()
        {
          ProductId = input.ProductsIds[i],
          SellId = updatedSell.Entity.Id,
        };
        await _context.ProductsSells.AddAsync(productsSell);
      }
      await _context.SaveChangesAsync();
      return sell;
    }

    public async Task<SellModel?> Delete(int id) {
      SellModel sell = await _context.Sells.FirstAsync(
        sell => sell.Id == id
      );
      if (sell == null) {
        return null;
      }
      _context.Sells.Remove(sell);
      await _context.SaveChangesAsync();
      return sell;
    }
  }
}
