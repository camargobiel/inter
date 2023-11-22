using Microsoft.EntityFrameworkCore;
using TextilTech.Controllers.Models;
using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Repositories {
  public class ProductsRepository : IProductsRepository {
    private readonly DatabaseContext _context;
    public ProductsRepository(DatabaseContext context) {
      _context = context;
    }
    public async Task<ProductModel> Create(ProductModel product) {
      var created = await _context.Products.AddAsync(product);
      await _context.SaveChangesAsync();
      return created.Entity;
    }

    public async Task<ProductModel?> Read(int id) {
      ProductModel? product = await _context.Products.FindAsync((ProductModel x) => x.Id == id);
      return product;
    }

    public async Task<List<ProductModel>> ReadAll(int companyId) {
      List<ProductModel> products = await _context.Products
        .Where((x) => x.CompanyId == companyId)
        .ToListAsync();
      return products;
    }

    public async Task<ProductModel> Update(ProductModel product) {
      _context.Products.Update(product);
      await _context.SaveChangesAsync();
      return product;
    }

    public async Task<ProductModel?> Delete(int id) {
      ProductModel? product = await _context.Products.FindAsync(id);
      if (product == null) {
        return null;
      }
      _context.Products.Remove(product);
      await _context.SaveChangesAsync();
      return product;
    }
  }
}
