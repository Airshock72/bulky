using Bulky.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<Villa> Villas { get; set; }
}