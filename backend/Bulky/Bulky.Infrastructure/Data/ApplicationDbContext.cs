using Bulky.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<Villa> Villas { get; set; }
    public DbSet<VillaNumber> VillaNumbers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Villa>().HasData(
            new Villa
            {
                Id = 1,
                Name = "Royal Villa",
                Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                ImageUrl = "https://placehold.co/600x400",
                Occupancy = 4,
                Price = 200,
                Sqft = 550
            },
            new Villa
            {
                Id = 2,
                Name = "Premium Pool Villa",
                Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                ImageUrl = "https://placehold.co/600x401",
                Occupancy = 4,
                Price = 300,
                Sqft = 550
            },
            new Villa
            {
                Id = 3,
                Name = "Luxury Pool Villa",
                Description = "Fusce 11 tincidunt maximus leo, sed scelerisque massa auctor sit amet. Donec ex mauris, hendrerit quis nibh ac, efficitur fringilla enim.",
                ImageUrl = "https://placehold.co/600x402",
                Occupancy = 4,
                Price = 400,
                Sqft = 750
            }
        );
        
        modelBuilder.Entity<VillaNumber>().HasData(
            new VillaNumber
            {
                Id = 1,
                Number = 101,
                VillaId = 2,
                SpecialDetails = "This is a special detail for Villa Number 101"
            },
            new VillaNumber
            {
                Id = 2,
                Number = 102,
                VillaId = 2,
                SpecialDetails = "This is a special detail for Villa Number 102"
            },
            new VillaNumber
            {
                Id = 3,
                Number = 201,
                VillaId = 2,
                SpecialDetails = "This is a special detail for Villa Number 201"
            }
        );
    }
}