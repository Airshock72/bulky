using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class AmenityRepository : Repository<Amenity>, IAmenityRepository
{
    private readonly ApplicationDbContext _db;
    public AmenityRepository(ApplicationDbContext db) : base(db) { _db = db; }

    public IEnumerable<Amenity> GetAllWithVilla()
    {
        return _db.Amenities.Include(v => v.Villa).ToList();
    }
}