using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddTransient<ExceptionsMiddleWare>();

var app = builder.Build();

//Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionsMiddleWare>();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"));

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
