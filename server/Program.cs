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

      // enable cors for locahost:3000
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
