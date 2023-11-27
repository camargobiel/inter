using Microsoft.EntityFrameworkCore;
using TextilTech.Data;
using TextilTech.Models;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories.Results.CustomersRepository;

namespace TextilTech.Repositories {
  public class CustomersRepository: ICustomersRepository {
    private readonly DatabaseContext _context;
    public CustomersRepository(DatabaseContext context) {
      _context = context;
    }

    public async Task<CustomerModel> Create(CustomerModel customer) {
      await _context.Customers.AddAsync(customer);
      await _context.SaveChangesAsync();
      return customer;
    }

    public async Task<CustomerModel?> Read(int id)
    {
      return await _context.Customers.FindAsync(id);
    }

    public async Task<List<ReadAllResult>> ReadAll(int CompanyId)
    {
      var customers = await _context.Customers.Where(
        customer => customer.CompanyId == CompanyId
      ).ToListAsync();
      var results = new List<ReadAllResult>();

      foreach (var customer in customers)
      {
        var purchaseCount = await _context.Sells
          .Where(sell => sell.CompanyId == CompanyId)
          .CountAsync();

        var result = new ReadAllResult
        {
          Id = customer.Id,
          Phone = customer.Phone,
          Name = customer.Name,
          PurchaseCount = purchaseCount,
          CompanyId = customer.CompanyId
        };

        results.Add(result);
      }

      return results;
    }

    public async Task<CustomerModel> Update(CustomerModel customer)
    {
      _context.Customers.Update(customer);
      await _context.SaveChangesAsync();
      return customer;
    }

    public async Task<CustomerModel> Delete(int id) {
      CustomerModel? customerToDelete = await _context.Customers.FindAsync(id);
      if (customerToDelete == null) {
        throw new Exception("Customer not found");
      }
      _context.Customers.Remove(customerToDelete);
      await _context.SaveChangesAsync();
      return customerToDelete;
    }
  }
}
