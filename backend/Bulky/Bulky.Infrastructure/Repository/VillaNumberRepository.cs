using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class VillaNumberRepository : Repository<VillaNumber>, IVillaNumberRepository
{
    public VillaNumberRepository(ApplicationDbContext db) : base(db) { }
}