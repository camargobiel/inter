using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories.Results.CustomersRepository;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class CustomerController : ControllerBase {
    private readonly ICustomersRepository _customersRepository;

    public CustomerController(
      ICustomersRepository customersRepository
    ) {
      _customersRepository = customersRepository;
    }

    [HttpGet("/api/customers/{CompanyId}")]
    public async Task<ActionResult<List<ReadAllResult>>> GetCustomers(int CompanyId) {
      List<ReadAllResult> customers = await _customersRepository.ReadAll(CompanyId);
      return Ok(customers);
    }

    [HttpGet("/api/customers/single/{id}")]
    public async Task<ActionResult<CustomerModel>> GetSingleCustomer(int id) {
      CustomerModel? customer = await _customersRepository.Read(id);
      return Ok(customer);
    }

    [HttpPost("/api/customers")]
    public async Task<ActionResult<CustomerModel>> CreateCustomer(CustomerModel customer) {
      CustomerModel result = await _customersRepository.Create(customer);
      return Ok(result);
    }

    [HttpPut("/api/customers")]
    public async Task<ActionResult<CustomerModel>> UpdateCustomer(CustomerModel customer) {
      CustomerModel result = await _customersRepository.Update(customer);
      return Ok(result);
    }

    [HttpDelete("/api/customers/{id}")]
    public async Task<ActionResult<CustomerModel?>> DeleteCustomer(int id) {
      CustomerModel? result = await _customersRepository.Delete(id);
      return Ok(result);
    }
  }
}
