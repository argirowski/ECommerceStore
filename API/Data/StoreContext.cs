using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Basket> Baskets { get; set; }
        public required DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "2d3e86e8-f1f5-476b-a180-925f28c906ed", Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Id = "022a3d91-63e2-4ee3-aa3f-328ac3a08b28", Name = "Member", NormalizedName = "MEMBER" }
            );
        }
    }
}