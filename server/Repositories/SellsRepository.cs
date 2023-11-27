using Microsoft.EntityFrameworkCore;
using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Inputs;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Repositories {
  public class SellsRepository: ISellsRepository {
    private readonly DatabaseContext _context;
    public SellsRepository(DatabaseContext context) {
      _context = context;
    }

    public async Task<SellModel> Create(SellModel sell) {
      await _context.Sells.AddAsync(sell);
      await _context.SaveChangesAsync();
      return sell;
    }

    public async Task<List<SellModel>> ReadAll(ReadAllSellsInput? input) {
      if (input == null) {
        return await _context.Sells.ToListAsync();
      }
      return await _context.Sells
        .ToListAsync();
    }
  }
}
