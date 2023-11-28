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

        var allPurchases = await _context.Sells
          .Where(sell => sell.CompanyId == CompanyId)
          .Where(sell => sell.CustomerId == customer.Id)
          .ToListAsync();

        var purchases = new List<int>();

        foreach (var purchase in allPurchases)
        {
          _context.ProductsSells
            .Where(sellProduct => sellProduct.SellId == purchase.Id)
            .ToList()
            .ForEach(sellProduct => purchases.Add(sellProduct.ProductId));
        }
        var mostPurchasedProductId = purchases.GroupBy(purchase => purchase)
            .OrderByDescending(group => group.Count())
            .Select(group => group.Key)
            .FirstOrDefault();

        var mostPurchasedProduct = await _context.Products
          .Where(product => product.Id == mostPurchasedProductId)
          .FirstOrDefaultAsync();

        var result = new ReadAllResult
        {
          Id = customer.Id,
          Phone = customer.Phone,
          Name = customer.Name,
          PurchaseCount = purchaseCount,
          CompanyId = customer.CompanyId,
          MostPurchasedProduct = mostPurchasedProduct?.Name
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
