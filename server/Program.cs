using TextilTech.Data;
using Microsoft.EntityFrameworkCore;
using TextilTech.Repositories.Interfaces;
using TextilTech.Repositories;

namespace TextilTech {
  public class Program {
    public static void Main(string[] args) {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddControllers();
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      builder.Services.AddCors(options => {
        options.AddPolicy("CorsPolicy", builder => builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
        );
      });

      builder.Services.AddDbContextPool<DatabaseContext>(
        options => options.UseNpgsql(builder.Configuration
          .GetConnectionString("DataBase")
        )
      );

      builder.Services.AddScoped<IUsersRepository, UsersRepository>();
      builder.Services.AddScoped<ICompaniesRepository, CompaniesRepository>();
      builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
      builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
      builder.Services.AddScoped<ISellsRepository, SellsRepository>();

      var app = builder.Build();
      app.UseSwagger();
      app.UseSwaggerUI();
      app.UseHttpsRedirection();
      app.UseCors("CorsPolicy");
      app.UseAuthorization();
      app.MapControllers();
      app.Run();
    }
  }
}
