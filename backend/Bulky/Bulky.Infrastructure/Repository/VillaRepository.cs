using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class VillaRepository : Repository<Villa>, IVillaRepository
{
    private readonly ApplicationDbContext _db;
    public VillaRepository(ApplicationDbContext db) : base(db) { _db = db; }

    public IEnumerable<object> GetListOptions()
    {
        return _db.Villas.Select(v => new { v.Id, v.Name }).ToList();
    }

    public Villa? Get(int id)
    {
        return _db.Villas.FirstOrDefault(v => v.Id == id);
    }
}