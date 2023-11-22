using Microsoft.AspNetCore.Mvc;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class ProductController : ControllerBase {
    private readonly IProductsRepository _productsRepository;

    public ProductController(
      IProductsRepository productsRepository
    ) {
      _productsRepository = productsRepository;
    }

    [HttpGet("/api/Product/all/{companyId}")]
    public async Task<ActionResult<List<ProductModel>>> GetProducts(int companyId) {
      List<ProductModel> products = await _productsRepository.ReadAll(companyId);
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductModel>> GetSingleProduct(int id) {
      ProductModel? product = await _productsRepository.Read(id);
      return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<ProductModel>> CreateProduct(ProductModel product) {
      ProductModel result = await _productsRepository.Create(product);
      return Ok(result);
    }

    [HttpPut("/api/Product/update")]
    public async Task<ActionResult<ProductModel>> UpdateProduct(ProductModel product) {
      ProductModel result = await _productsRepository.Update(product);
      return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ProductModel?>> DeleteProduct(int id) {
      ProductModel? result = await _productsRepository.Delete(id);
      return Ok(result);
    }
  }
}
