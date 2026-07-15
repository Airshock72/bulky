using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class AmenityRepository : Repository<Amenity>, IAmenityRepository
{
    public AmenityRepository(ApplicationDbContext db) : base(db) { }
}