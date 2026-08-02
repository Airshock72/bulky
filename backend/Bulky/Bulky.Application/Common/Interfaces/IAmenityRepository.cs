using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IAmenityRepository : IRepository<Amenity>
{
    IEnumerable<Amenity> GetAll();
}
