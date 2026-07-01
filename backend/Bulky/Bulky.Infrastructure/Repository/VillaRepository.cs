using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class VillaRepository : IVillaRepository
{
    private readonly ApplicationDbContext _db;
    public VillaRepository(ApplicationDbContext db) { _db = db; }

    public void Add(Villa villa)
    {
        _db.Villas.Add(villa);
    }

    public void Remove(Villa villa)
    {
        _db.Villas.Remove(villa);
    }
    
    public List<Villa> GetList()
    {
        return _db.Villas.ToList();
    }

    public IEnumerable<object> GetListOptions()
    {
        return _db.Villas.Select(v => new { v.Id, v.Name }).ToList();
    }

    public Villa? Get(int id)
    {
        return _db.Villas.FirstOrDefault(v => v.Id == id);
    }

    public void Save()
    {
        _db.SaveChanges();
    }
}