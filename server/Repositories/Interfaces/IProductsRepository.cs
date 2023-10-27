using TextilTech.Models;

namespace TextilTech.Repositories.Interfaces {
  public interface IProductsRepository {
    Task<ProductModel> Create(ProductModel product);
    Task<ProductModel> Read(Guid id);
    Task<List<ProductModel>> ReadAll();
    Task<ProductModel> Update(ProductModel product);
    Task<bool> Delete(Guid id);
  }
}
