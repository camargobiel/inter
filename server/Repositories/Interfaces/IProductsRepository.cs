using TextilTech.Models;

namespace TextilTech.Repositories.Interfaces {
  public interface IProductsRepository {
    Task<ProductModel> Create(ProductModel product);
    Task<ProductModel?> Read(int id);
    Task<List<ProductModel>> ReadAll(int companyId);
    Task<ProductModel> Update(ProductModel product);
    Task<ProductModel?> Delete(int id);
  }
}
