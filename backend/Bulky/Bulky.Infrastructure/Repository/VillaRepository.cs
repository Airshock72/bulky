using Bulky.Application.Common.Interfaces;
using Bulky.Application.DTOs.Villa;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class VillaRepository : Repository<Villa>, IVillaRepository
{
    private readonly ApplicationDbContext _db;

    public VillaRepository(ApplicationDbContext db) : base(db) => _db = db;

    public IEnumerable<Villa> GetAll() =>
        _db.Villas.ToList();

    public IEnumerable<VillaOptionDto> GetOptions() =>
        _db.Villas.Select(v => new VillaOptionDto { Id = v.Id, Name = v.Name }).ToList();

    public Villa? Get(int id) =>
        _db.Villas.FirstOrDefault(v => v.Id == id);

    public Villa? GetWithAmenities(int id) =>
        _db.Villas.Include(v => v.Amenities).FirstOrDefault(v => v.Id == id);
}
