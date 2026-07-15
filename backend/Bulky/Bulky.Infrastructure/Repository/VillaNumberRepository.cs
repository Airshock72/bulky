using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class VillaNumberRepository : Repository<VillaNumber>, IVillaNumberRepository
{
    private readonly ApplicationDbContext _db;
    public VillaNumberRepository(ApplicationDbContext db) : base(db) { _db = db; }

    public IEnumerable<VillaNumber> GetAllWithVilla()
    {
        return _db.VillaNumbers.Include(v => v.Villa).ToList();
    }
}